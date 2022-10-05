import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo, Post } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  host = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.host}/posts/`);
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.host}/photos/`);
  }
}
