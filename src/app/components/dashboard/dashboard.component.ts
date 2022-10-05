import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Photo, StorageService } from 'src/app/services/storage.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loader = false;

  constructor(
    private httpService: HttpService,
    public storage: StorageService
  ) { }

  ngOnInit(): void {
    if (this.storage.posts.length === 0) {
      this.loader = true;
      this.httpService.getPosts()
      .pipe(
        switchMap(res => {
          this.storage.posts = res;
          return this.httpService.getPhotos()
        })
      )
      .subscribe(res => {
        this.storage.photos = res;
        this.countAlbums(this.storage.photos);
        this.storage.photoQty = this.storage.photos.length;
        this.storage.postQty = this.storage.posts.length;
        this.loader = false;
        console.log(this.storage.photos)
      })
    }
  }

  countAlbums(array: Photo[]) {
    const out = [];
    let uniqAlbumId = [];
    for (let i = 0; i < array.length; i ++) {
      out.push(array[i].albumId);
      if (array.length-1 === i) {
        uniqAlbumId = [...new Set(out)];
        this.storage.albumQty = uniqAlbumId.length;
      }
    }
  }

}
