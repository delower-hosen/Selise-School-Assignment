import { EditComponent } from '../edit/edit.component';
import { Page } from './../../model/page';
import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddBookComponent } from '../add-book/add-book.component';
import { MockServerResultsService } from '../../services/book.service'
import { BookModel } from './../../model/book-model';
import { FilterPipe } from 'ngx-filter-pipe';
import { defaultConstant } from 'src/app/config/constants/default.constant';
import { ManagementService } from 'src/app/services/management.service';
import { cloneDeep } from 'lodash';
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
  public storeKey = defaultConstant.Keys.StoreKey;
  public cartKey = defaultConstant.Keys.CartKey;

  @ViewChild('updateTemplate') updateTemplate: TemplateRef<any>;
  datatableColumns: any;

  constructor(
    private dialog: MatDialog,
    private serverResultsService: MockServerResultsService,
    private _managementService: ManagementService,
    private filterPipe: FilterPipe
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
   }

  ngOnInit() {
    debugger;
    this._managementService.getTableUpdateEvent().subscribe(book=>{
      this.updateStore(book);
    })
    this.setPage({ offset: 0 });
    this.initDataTable();
    
  }

  updateStore(book){
    console.log(this.rows);
    
    for(let i = 0; i<this.rows.length;i++){
      if(this.rows[i].bookid == book.bookid){
        this.rows[i] = book;
        this.rows = [...this.rows];
      }
    }
    console.log(this.rows);
    this.page.totalElements = this.rows.length;
    
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

  delete(book) {
    let currentCart = [];
    let canBeDeleted: boolean = true;
    currentCart = JSON.parse(localStorage.getItem(this.cartKey))?JSON.parse(localStorage.getItem(this.cartKey)):[];

    for(let cart of currentCart){
      if(cart.bookid == book.bookid) canBeDeleted = false;
    }
    if(!canBeDeleted){
      alert("Can't be deleted! This is in shopping cart!")
    }
    
    if(canBeDeleted){
    for(let index = 0; index<this.rows.length;index++){
      if(this.rows[index].bookid == book.bookid){
        this.rows.splice(index, 1);
        this.rows = [...this.rows];
      }
    }
    this.page.totalElements = this.rows.length;
    localStorage.setItem(this.storeKey, JSON.stringify(this.rows));
  }

  }

  update(row){
    const dialogRef = this.dialog.open(EditComponent, {
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
