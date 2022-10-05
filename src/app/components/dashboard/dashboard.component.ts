import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Photo, StorageService } from 'src/app/services/storage.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loader = false;

  constructor(
    private httpService: HttpService,
    public storage: StorageService
  ) { }

  ngOnInit(): void {
    if (this.storage.posts.length === 0) {
      this.loader = true;
      const subs = this.storage.getAllData()
        .subscribe(()=> {
          this.loader = false;
          subs.unsubscribe();
        })
    }
  }

}
