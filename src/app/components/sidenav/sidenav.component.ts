import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

export type RouteData = {
  title: string,
  route: string,
  state?: boolean
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() initNav = new EventEmitter();

  navData: {title: string, route: string}[] = [
    {title: 'Dashboard', route: 'dashboard'},
    {title: 'Posts', route: 'posts'},
    {title: 'Photos', route: 'photos'}
  ]

  constructor(
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.initNav.emit(this.elRef);
  }

}
