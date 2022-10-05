import { Injectable } from '@angular/core';

export type Post = {userId: number, id: number, title: string};
export type Photo = {albumId: number, id: number, thumbnailUrl: string, title: string, url: string};

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  posts: Post[] = [];
  photos: Photo[] = [];
  postQty!: number;
  albumQty!: number;
  photoQty!: number;
}