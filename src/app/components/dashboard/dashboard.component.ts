import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    public storage: StorageService
  ) { }

  ngOnInit(): void {
    this.httpService.getPosts()
      .pipe(
        switchMap(res => {
          this.storage.posts = res;
          return this.httpService.getPhotos()
        })
      )
      .subscribe(res => {
        this.storage.photos = res;
      })
  }

}
