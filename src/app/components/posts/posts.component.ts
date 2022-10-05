import { Component, OnInit } from '@angular/core';
import { Post, StorageService } from 'src/app/services/storage.service';
import { RouteData } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  navData: RouteData[] = [
    {title: 'Dashboard', route: '', state: true},
    {title: 'Posts', route: 'posts', state: false}
  ]

  viewPosts: Post[] = [];
  loader = false;
  titleTable: string[] = [
    'ID', 'User', 'Title', 'Content'
  ];

  constructor(
    public storage: StorageService
  ) { }

  ngOnInit(): void {
    if (this.storage.posts.length === 0) {
      this.loader = true;
      const subs = this.storage.getAllData()
        .subscribe(()=> {
          this.loader = false;
          this.setViewPosts(1);
          subs.unsubscribe();
        })
    } else {
      this.setViewPosts(1);
    }
    console.log(this.storage.posts)
  }

  setViewPosts(page: number): void {
    const index = page * 5;
    this.viewPosts = this.storage.posts.slice(index-5, index);
  }

}
