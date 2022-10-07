import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { RouteData } from '../../sidenav/sidenav.component';
import { PhotosItemComponent } from '../photos-item/photos-item.component';

@Component({
  selector: 'app-photos-parent',
  templateUrl: './photos-parent.component.html',
  styleUrls: ['./photos-parent.component.css']
})
export class PhotosParentComponent implements OnInit {

  id: any;
  subsStorage!: Subscription;
  postState = false;

  navData: RouteData[] = [
    { title: 'Dashboard', route: '', state: true },
    { title: 'Photos', route: '/photos', state: false },
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
    if (!(component instanceof PhotosItemComponent)) {
      this.postState = false;
    }
  }

}
