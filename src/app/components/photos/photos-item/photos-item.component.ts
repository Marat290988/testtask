import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { Photo, StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-photos-item',
  templateUrl: './photos-item.component.html',
  styleUrls: ['./photos-item.component.css']
})
export class PhotosItemComponent implements OnInit {

  photoItem: Photo = {url: '', title: '', id: 0, albumId: 0, thumbnailUrl: ''};
  loader = true;
  httpSubs!: Subscription;
  routerSubs!: Subscription;
  @ViewChild('img') img!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private storage: StorageService,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.routerSubs = this.route.params.subscribe((params : Params) => {
      const id = params['id'];
      this.storage.postIdChange.next(id);
      this.httpSubs = this.http.getPhoto(id).subscribe(photo => {
        this.photoItem = photo;
        const subs = fromEvent(this.img.nativeElement, 'load').subscribe(e => {
          this.loader = false;
          subs.unsubscribe();
        })
      })
    })

  }
  
  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
    this.httpSubs.unsubscribe();
  }

}
