import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { Post, StorageService } from 'src/app/services/storage.service';
import { RouteData } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {


  formGroup!: FormGroup;
  viewPosts: Post[] = [];
  loader = false;
  titleTable: any[] = [
    {title: 'ID', state: false, type: 'NUM', key: 'id'}, 
    {title: 'User', state: false, type: 'NUM', key: 'userId'}, 
    {title: 'Title', state: false, type: 'STR', key: 'title'}, 
    {title: 'Content', state: false, type: 'STR', key: 'body'}
  ];
  allPosts: any[] = [];
  resetPaginator$ = new Subject();
  formSubs!: Subscription;
  routerSubs!: Subscription;

  constructor(
    public storage: StorageService,
    private router: Router
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
    this.formGroup = new FormGroup({
      search: new FormControl(''),
      key: new FormControl('id')
    });
    this.formSubs = this.formGroup.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(input => {
        const search = input.search;
        this.router.navigate(['/posts'], {queryParams: {search: search}});
      })
    this.routerSubs = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        const key = this.formGroup.get('key')!.value;
        this.allPosts = this.storage.posts.filter((post: any) => String(post[key]).indexOf(searchParam!) > -1);
        this.setViewPosts(1);
        this.resetPaginator$.next(this.allPosts.length);
      }
    })
  }

  ngOnDestroy() {
    this.formSubs.unsubscribe();
    this.routerSubs.unsubscribe();
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
    this.resetPaginator$.next(this.allPosts.length);
  }

  setViewPosts(page: number): void {
    const index = page * 5;
    this.viewPosts = this.allPosts.slice(index-5, index);
  }

  onChangePage(page: number) {
    this.setViewPosts(page);
  }

  navigateTo(id: any) {
    this.router.navigate([`posts/${id}`]);
  }

}
