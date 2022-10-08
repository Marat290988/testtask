import { Component, ViewChild, ElementRef } from '@angular/core';
import { User } from './components/user/user.component';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userState = false;
  userItem!: User | any;
  nav!: ElementRef;
  openState = false;
  
  constructor(
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.storage.userChange.subscribe((user: User | any) => {
      if (user) {
        this.userItem = user;
        this.userState = true;
      } else {
        this.userState = false;
      }
    })
  }

  ngAfterViewInit() {
    
  }

  openNav() {
    const width = window.getComputedStyle(this.nav.nativeElement).getPropertyValue('width');
    if (this.openState) {
      this.nav.nativeElement.style.transform = `translate(0)`;
      this.openState = !this.openState;
    } else {
      console.log(this.nav.nativeElement)
      this.nav.nativeElement.style.transform = `translate(${width})`;
      this.openState = !this.openState;
    }
    
  }

}
