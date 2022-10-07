import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { Photo, StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  formGroup!: FormGroup;
  viewPhotos: Photo[] = [];
  allPhotos: any[] = [];
  loader = false;
  resetPaginator$ = new Subject();
  formSubs!: Subscription;
  routerSubs!: Subscription;

  constructor(
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.storage.posts.length === 0) {
      this.loader = true;
      const subs = this.storage.getAllData()
        .subscribe(()=> {
          this.loader = false;
          this.allPhotos = [...this.storage.photos];
          this.setViewPhotos(1);
          subs.unsubscribe();
          this.loader = false;
        })
    } else {
      this.allPhotos = [...this.storage.photos];
      this.setViewPhotos(1);
    }
    this.formGroup = new FormGroup({
      search: new FormControl('')
    });
    this.formSubs = this.formGroup.valueChanges
    .pipe(
      debounceTime(1000)
    )
    .subscribe(input => {
      const search = input.search;
      this.router.navigate(['/photos'], {queryParams: {search: search}});
    })
    this.routerSubs = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        this.allPhotos = this.storage.photos.filter((post: any) => String(post['title']).indexOf(searchParam!) > -1);
        this.setViewPhotos(1);
        this.resetPaginator$.next(this.allPhotos.length);
      }
    })
  }

  ngOnDestroy() {
    this.formSubs.unsubscribe();
    this.routerSubs.unsubscribe();
  }

  setViewPhotos(page: number): void {
    const index = page * 12;
    this.viewPhotos = this.allPhotos.slice(index-12, index);
  }

  onChangePage(page: number) {
    this.setViewPhotos(page);
  }

}
