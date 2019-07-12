import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddBookComponent } from '../add-book/add-book.component';
import { MockServerResultsServiceService } from './../../sevices/book.service';
import { CorporateEmployee } from './../../model/book-model';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss']
})
export class BookManagementComponent implements OnInit {

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly pageLimit = 10;

  rows = [];
  isLoading: boolean;

  constructor(
    private dialog: MatDialog,
    private serverResultsService: MockServerResultsServiceService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.onScroll(0);
  }

  openModal(){
    this.dialog.open(AddBookComponent, {
      panelClass: 'productModal'
    })
      .afterClosed()
      .subscribe(result=>{
        console.log(result);
      });
  }

  onScroll(offsetY: number) {
    // total height of all rows in the viewport
    const viewHeight =
      this.el.nativeElement.getBoundingClientRect().height - this.headerHeight;

    // check if we scrolled to the end of the viewport
    if (
      !this.isLoading &&
      offsetY + viewHeight >= this.rows.length * this.rowHeight
    ) {
      // total number of results to load
      let limit = this.pageLimit;

      // check if we haven't fetched any results yet
      if (this.rows.length === 0) {
        // calculate the number of rows that fit within viewport
        const pageSize = Math.ceil(viewHeight / this.rowHeight);

        // change the limit to pageSize such that we fill the first page entirely
        // (otherwise, we won't be able to scroll past it)
        limit = Math.max(pageSize, this.pageLimit);
      }
      this.loadPage(limit);
    }
  }

  private loadPage(limit: number) {
    // debugger;
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this.isLoading = true;

    this.serverResultsService.getResults(this.rows.length, limit).subscribe(results => {
      let rows = [...this.rows, ...results.data];
       this.rows = rows;
      this.isLoading = false;
    });
  }


}
