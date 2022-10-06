import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post, StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  routerSubs!: Subscription;
  postItem!: Post;
  loader = false;

  constructor(
    private route: ActivatedRoute,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    if (this.storage.posts.length === 0) {
      this.loader = true;
      const subs = this.storage.getAllData()
        .subscribe(()=> {
          this.loader = false;
          this.routerSubs = this.route.params
          .subscribe((params : Params) => {
            const id = params['id'];
            this.postItem = this.storage.posts.filter(post => post.id == id)[0];
            this.storage.postIdChange.next(id);
          })
          subs.unsubscribe();
        })
    } else {
      this.routerSubs = this.route.params
      .subscribe((params : Params) => {
        const id = params['id'];
        this.postItem = this.storage.posts.filter(post => post.id == id)[0];
        this.storage.postIdChange.next(id);
      })
    }
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

}
