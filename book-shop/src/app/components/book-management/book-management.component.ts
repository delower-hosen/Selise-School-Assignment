import { Page } from './../../model/page';
import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddBookComponent } from '../add-book/add-book.component';
import { MockServerResultsService } from './../../sevices/book.service'
import { CorporateEmployee } from './../../model/book-model';
import { FilterPipe } from 'ngx-filter-pipe';
@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss']
})
export class BookManagementComponent implements OnInit {

  page = new Page();
  rows = new Array<CorporateEmployee>();
  temp  = new Array<CorporateEmployee>();

  constructor(
    private dialog: MatDialog,
    private serverResultsService: MockServerResultsService,
    private el: ElementRef,
    private filterPipe: FilterPipe
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
   }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

   /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */

  setPage(pageInfo){
    this.page.pageNumber = pageInfo.offset;
    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
      this.temp = [...this.rows];
    });
  }

  updateFilter(event) {
    debugger;
    const val = event.target.value.toLowerCase();
    console.log(val);
    // filter our data
    const temp = this.temp.filter(function(d) {
      debugger;
      let x = d.name.toLowerCase().indexOf(val) !== -1;
      return x;
    });
    console.log(temp);;
    

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
    // this.setPage({ offset: 0 });
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
