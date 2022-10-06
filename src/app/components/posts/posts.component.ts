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
  titleTable: any[] = [
    {title: 'ID', state: false, type: 'NUM', key: 'id'}, 
    {title: 'User', state: false, type: 'NUM', key: 'userId'}, 
    {title: 'Title', state: false, type: 'STR', key: 'title'}, 
    {title: 'Content', state: false, type: 'STR', key: 'body'}
  ];
  allPosts: any[] = [];

  constructor(
    public storage: StorageService
  ) { }

  ngOnInit(): void {
    if (this.storage.posts.length === 0) {
      this.loader = true;
      const subs = this.storage.getAllData()
        .subscribe(()=> {
          this.loader = false;
          this.allPosts = [...this.storage.posts];
          this.setViewPosts(1);
          subs.unsubscribe();
        })
    } else {
      this.allPosts = [...this.storage.posts];
      this.setViewPosts(1);
    }
    console.log(this.allPosts)
  }

  sortPosts(key: string, stateDirection: boolean, type: string) {
    if (stateDirection && type === 'STR') {
      this.allPosts.sort((a, b) => {
        const stringA = a[key].toLowerCase();
        const stringB = b[key].toLowerCase();
        if (stringA < stringB) {
          return -1;
        }
        if (stringA > stringB) {
          return 1;
        }
        return 0;
      })
    } else if (type === 'STR') {
      this.allPosts.sort((a, b) => {
        const stringA = a[key].toLowerCase();
        const stringB = b[key].toLowerCase();
        if (stringA < stringB) {
          return 1;
        }
        if (stringA > stringB) {
          return -1;
        }
        return 0;
      })
    }
    if (stateDirection && type === 'NUM') {
      this.allPosts.sort((a, b) => {
        const stringA = a[key];
        const stringB = b[key];
        if (stringA < stringB) {
          return -1;
        }
        if (stringA > stringB) {
          return 1;
        }
        return 0;
      })
    } else if (type === 'NUM') {
      this.allPosts.sort((a, b) => {
        const stringA = a[key];
        const stringB = b[key];
        if (stringA < stringB) {
          return 1;
        }
        if (stringA > stringB) {
          return -1;
        }
        return 0;
      })
    }
    this.setViewPosts(1);
  }

  onClickSort(head: {state: boolean, type: string, key: string}, par: HTMLDivElement) {
    const state = head.state;
    document.querySelectorAll('.d-flex.active').forEach(el => {
      el.classList.remove('active');
    })
    par.classList.add('active');
    for (let key in this.titleTable) {
      this.titleTable[key].state = false;
    }
    if (state) {
      head.state = !state;
      this.sortPosts(head.key, true, head.type);
    } else {
      head.state = !state;
      this.sortPosts(head.key, false, head.type);
    }
  }

  setViewPosts(page: number): void {
    const index = page * 5;
    this.viewPosts = this.allPosts.slice(index-5, index);
  }

  onChangePage(page: number) {
    this.setViewPosts(page);
  }

}
