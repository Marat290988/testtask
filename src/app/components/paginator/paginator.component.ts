import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() paginationData!: any[];
  currentPage = 1;
  maxPage!: number;
  pageElems: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.maxPage = this.paginationData.length / 5;
    this.pageElems = [
      {title: '...', state: false, selected: false},
      {title: this.currentPage, state: true, selected: true},
      {title: this.currentPage+1, state: true, selected: false},
      {title: this.currentPage+2, state: true, selected: false},
      {title: '...', state: true, selected: false},
      {title: this.maxPage, state: true, selected: false}
    ]
  }

  onChangePage(num: any) {
    if (num === '...') {
      return;
    }
    this.currentPage = num;
  }

  setPagElems() {
    if (this.currentPage>3) {
      this.pageElems[0].state = true;
    } else {
      this.pageElems[0].state = false;
    }
    if (this.paginationData.length > 1) {
      this.pageElems[2].state = false;
    }
    if (this.paginationData.length > 2) {
      this.pageElems[3].state = false;
    }
    if (this.currentPage === this.paginationData.length-1) {
      this.pageElems[4].state = false;
    } else {
      this.pageElems[4].state = true;
    }
  }

}
