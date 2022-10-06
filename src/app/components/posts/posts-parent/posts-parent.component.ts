import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouteData } from '../../sidenav/sidenav.component';
import { PostItemComponent } from './../post-item/post-item.component';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-posts-parent',
  templateUrl: './posts-parent.component.html',
  styleUrls: ['./posts-parent.component.css']
})
export class PostsParentComponent implements OnInit {

  
  id: any;
  subsStorage!: Subscription;
  postState = false;

  navData: RouteData[] = [
    { title: 'Dashboard', route: '', state: true },
    { title: 'Posts', route: '/posts', state: false },
    { title: '', route: '', state: false },
  ]

  constructor(
    private storage: StorageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subsStorage = this.storage.postIdChange.subscribe(id => {
      this.navData[2].title = String(id);
      this.postState = true;
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy() {
    this.subsStorage.unsubscribe();
  }

  onActivate(component: any) {
    if (!(component instanceof PostItemComponent) && this.navData.length === 3) {
      this.postState = false;
    }
  }

}
