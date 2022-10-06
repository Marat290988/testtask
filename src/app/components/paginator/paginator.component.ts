import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() paginationData!: any[];
  @Input() resetPaginator$!: Subject<any>;
  @Output() changePageEmit = new EventEmitter();
  resetSubs!: Subscription;
  currentPage = 1;
  beginPage = 1;
  maxPage!: number;
  pageElems: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.maxPage = this.paginationData.length / 5 < 1 ? 1 : Math.round(this.paginationData.length / 5);
    this.pageElems = [
      {title: '...', state: false, selected: false},
      {title: this.beginPage, state: true, selected: true},
      {title: this.beginPage+1, state: true, selected: false},
      {title: this.beginPage+2, state: true, selected: false},
      {title: '...', state: true, selected: false},
      {title: this.maxPage, state: true, selected: false}
    ]
    this.resetSubs = this.resetPaginator$.subscribe(length => {
      this.currentPage = 1;
      this.beginPage = 1;
      this.maxPage = length / 5 < 1 ? 1 : Math.round(length / 5);
      this.pageSelected(1);
      this.setPagElems();
    })
  }

  ngOnDestroy() {
    this.resetSubs.unsubscribe();
  }

  onChangePage(num: any, index: any, direction: string) {
    if (direction === 'NEXT' && this.currentPage < this.maxPage-1) {
      this.currentPage++;
      this.changePageEmit.emit(this.currentPage);
      if (this.currentPage - this.beginPage === 1) {
        this.pageSelected(2);
      } else if (this.currentPage - this.beginPage === 2 && this.maxPage - this.currentPage !== 2) {
        this.pageSelected(3);
      } 
      else if (this.currentPage - this.beginPage >= 2) {
        this.beginPage++;
        this.pageSelected(3);
        this.setPagElems();
      }
      return;
    } else if (direction === 'NEXT' && this.currentPage < this.maxPage) {
      this.currentPage++;
      this.changePageEmit.emit(this.currentPage);
      this.pageSelected(5);
      return;
    }
    if (direction === 'PREV' && this.currentPage > 1) {
      this.currentPage--;
      this.changePageEmit.emit(this.currentPage);
      if (this.currentPage - this.beginPage === 1) {
        this.pageSelected(2);
      } else if (this.currentPage - this.beginPage === 2) {
        this.pageSelected(3);
      } else if (this.currentPage - this.beginPage === 0) {
        this.pageSelected(1);
      } else if (this.currentPage < this.beginPage) {
        this.beginPage--;
        this.pageSelected(1);
        this.setPagElems();
        return;
      }
    }
    if (direction === 'CLICK') {
      this.pageSelected(index);
      this.currentPage = +num;
      this.changePageEmit.emit(this.currentPage);
      return;
    }
    if (direction === 'MAX') {
      this.currentPage  = +num;
      this.changePageEmit.emit(this.currentPage);
      this.beginPage = this.maxPage-3;
      this.pageSelected(5);
      this.setPagElems();
      return;
    }
  }

  pageSelected(index: number) {
    this.pageElems[1].selected = false;
    this.pageElems[2].selected = false;
    this.pageElems[3].selected = false;
    this.pageElems[5].selected = false;
    this.pageElems[index].selected = true;
  }

  setPagElems() {
    if (this.beginPage > 1) {
      this.pageElems[0].state = true;
    } else {
      this.pageElems[0].state = false;
    }
    if (this.maxPage > 1) {
      this.pageElems[2].state = true;
    } else {
      this.pageElems[2].state = false;
    }
    if (this.maxPage > 2) {
      this.pageElems[3].state = true;
    } else {
      this.pageElems[3].state = false;
    }
    if (this.beginPage > this.maxPage - 4) {
      this.pageElems[4].state = false;
    } else {
      this.pageElems[4].state = true;
    }
    if (this.maxPage < 4) {
      this.pageElems[5].state = false;
    } else {
      this.pageElems[5].state = true;
    }
  }

}
