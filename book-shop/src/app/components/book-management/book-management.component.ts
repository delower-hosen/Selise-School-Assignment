import { Page } from './../../model/page';
import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddBookComponent } from '../add-book/add-book.component';
import { MockServerResultsService } from './../../sevices/book.service'
import { BookModel } from './../../model/book-model';
import { FilterPipe } from 'ngx-filter-pipe';
@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss']
})
export class BookManagementComponent implements OnInit {

  page = new Page();
  rows = new Array<BookModel>();
  temp  = new Array<BookModel>();

  constructor(
    private dialog: MatDialog,
    private serverResultsService: MockServerResultsService,
    private filterPipe: FilterPipe
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
   }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo){
    this.page.pageNumber = pageInfo.offset;
    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
      this.temp = [...this.rows];
    });
  }

  updateFilter(event) {
    const searchValue = event.target.value.toLowerCase();

    const temp = this.temp.filter(function(book) {
      debugger;
      let matchedBook = book.name.toLowerCase().indexOf(searchValue) !== -1;
      return matchedBook;
    });

    this.rows = temp;
    this.page.totalElements = this.rows.length;
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

}
