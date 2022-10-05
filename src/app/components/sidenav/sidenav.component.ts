import { Component, OnInit } from '@angular/core';

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

  navData: {title: string, route: string}[] = [
    {title: 'Dashboard', route: 'dashboard'},
    {title: 'Posts', route: 'posts'},
    {title: 'Photos', route: 'photos'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
