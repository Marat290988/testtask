import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo, Post } from './storage.service';
import { User } from '../components/user/user.component';

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

  getPhoto(id: any): Observable<Photo> {
    return this.http.get<Photo>(`${this.host}/photos/${id}`);
  }

  getUser(id: any): Observable<User> {
    return this.http.get<User>(`${this.host}/users/${id}`);
  }
}
