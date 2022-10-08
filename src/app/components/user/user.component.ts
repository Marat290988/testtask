import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Subscription, switchMap } from 'rxjs';
import { Post, StorageService } from 'src/app/services/storage.service';

export type User = {
  username: string,
  email: string,
  website: string,
  company: {name: string},
  address: {city: string},
  name: string
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  routerSubs!: Subscription;
  loader = true;
  userItem!: User;
  userPosts: Post[] = [];
  userId!: any;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    if (this.storage.posts.length === 0) {
      this.routerSubs = this.route.params
        .pipe(
          switchMap((params : Params) => {
            this.userId = params['id'];
            return this.storage.getAllData();
          }),
          switchMap(() => {
            return this.http.getUser(this.userId);
          })
        )
        .subscribe(user => {
          this.userItem = user;
          this.userPosts = this.storage.posts.filter(item => item.userId == this.userId);
          this.loader = false;
          this.storage.userChange.next(this.userItem);
        })
    } else {
      this.routerSubs = this.route.params
        .pipe(
          switchMap((params : Params) => {
            this.userId = params['id'];
            return this.http.getUser(this.userId);
          })
        )
        .subscribe(user => {
          this.userItem = user;
          this.userPosts = this.storage.posts.filter(item => item.userId == this.userId);
          this.loader = false;
          this.storage.userChange.next(this.userItem);
        })
    }
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
    this.storage.userChange.next(false);
  }

}
