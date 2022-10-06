import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { map, Observable, Subject, switchMap } from 'rxjs';

export type Post = {userId: number, id: number, title: string, body: string};
export type Photo = {albumId: number, id: number, thumbnailUrl: string, title: string, url: string};

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  postIdChange = new Subject();

  constructor(
    private httpService: HttpService
  ) {

  }

  getAllData(): Observable<any> {
    return this.httpService.getPosts()
      .pipe(
        switchMap(res => {
          this.posts = res;
          return this.httpService.getPhotos()
        }),
        map(res => {
          this.photos = res;
          this.countAlbums(this.photos);
          this.photoQty = this.photos.length;
          this.postQty = this.posts.length;
        })
      )
  }

  countAlbums(array: Photo[]) {
    const out = [];
    let uniqAlbumId = [];
    for (let i = 0; i < array.length; i ++) {
      out.push(array[i].albumId);
      if (array.length-1 === i) {
        uniqAlbumId = [...new Set(out)];
        this.albumQty = uniqAlbumId.length;
      }
    }
  }

  posts: Post[] = [];
  photos: Photo[] = [];
  postQty!: number;
  albumQty!: number;
  photoQty!: number;
}