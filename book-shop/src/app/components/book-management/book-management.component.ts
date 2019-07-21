import { EditComponent } from './../edit/edit.component';
import { Page } from './../../model/page';
import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddBookComponent } from '../add-book/add-book.component';
import { MockServerResultsService } from './../../sevices/book.service'
import { BookModel } from './../../model/book-model';
import { FilterPipe } from 'ngx-filter-pipe';
import { defultConstant } from 'src/app/config/constants/default.constant';
@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss']
})
export class BookManagementComponent implements OnInit {

  page = new Page();
  rows = new Array<BookModel>();
  temp  = new Array<BookModel>();
  selected = [];
  public storeKey = defultConstant.Keys.StoreKey;
  public cartKey = defultConstant.Keys.CartKey;

  @ViewChild('updateTemplate') updateTemplate: TemplateRef<any>;
  datatableColumns: any;

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
    this.initDataTable();
  }

  initDataTable() {
    this.datatableColumns = [
      {name:'Name'},
      {name:'Author'},
      {name:'Price'}, 
      {
        name: '',
        cellTemplate: this.updateTemplate 
      }
    ]
  }

  delete(itemId) {
    let remainingBooks = [];
    let currentCart = [];
    let canBeDeleted: boolean = true;
    remainingBooks = JSON.parse(localStorage.getItem(this.storeKey))?JSON.parse(localStorage.getItem(this.storeKey)):[];
    currentCart = JSON.parse(localStorage.getItem(this.cartKey))?JSON.parse(localStorage.getItem(this.cartKey)):[];

    for(let cart of currentCart){
      if(cart.bookId == itemId) canBeDeleted = false;
    }
    if(!canBeDeleted){
      alert("Can't be deleted! This is in shopping cart!")
    }
    if(canBeDeleted){
    for(let index = 0; index < remainingBooks.length; index++){
      if(remainingBooks[index].bookId == itemId){
        remainingBooks.splice(index, 1);
      }
    }
    localStorage.setItem('mystore', JSON.stringify(remainingBooks));
    this.rows = remainingBooks;
    this.page.totalElements = this.rows.length;
  }

  }

  update(row){
    debugger;
    const dialogRef = this.dialog.open(EditComponent,{
      data: row
    });

    dialogRef.afterClosed().subscribe(result=> {
      console.log(result);
      
    });
  
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
