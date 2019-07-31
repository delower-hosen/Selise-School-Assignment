import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { defaultConstant } from './../../config/constants/default.constant'
import { ManagementService } from 'src/app/services/management.service';
import { CommonDataService } from 'src/app/services/common-data.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  public formAddBook: FormGroup;
  maxDate = defaultConstant.Date.CurrentDate;

  constructor(
    private _toastr: ToastrService,
    private routerCh: Router,
    private _commonDataService: CommonDataService
  ) { 
  }

  ngOnInit() {
    this.intitForm();
  }

  onSubmit(){
    if(this.isBookInfoValid()){
      let storeKey = defaultConstant.Keys.StoreKey;
      let generatedGuid = this.generateGuid();
      let newBook = this.formAddBook.value;
      newBook.bookid = generatedGuid;

      let Books: Array<any> = [];
      let currentBooks = this._commonDataService.getData(storeKey);
      Books = currentBooks? currentBooks : [];
      Books.push(newBook);
      
      this._commonDataService.postBook(newBook).subscribe((res) =>{
        this.routerCh.navigate(['/manage-book']);
      });
      
      this._commonDataService.setData(storeKey, Books);
      this.showSuccess();
      this.resetForm();
    }
  }

  intitForm(){
    this.formAddBook = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      author: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      imageurl: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    });
  }
  

  get getFormErrors() {
    return this.formAddBook.controls;
  }

  isBookInfoValid(){
    let book = this.formAddBook.value;
    let flag: boolean = true;
    Object.keys(book).forEach(prop=>{
      if(!book[prop]) flag = false
    });
    return flag;
  }

  showSuccess() {
    this._toastr.success('Book added succussfully');
  }

  resetForm(){
    setTimeout(() => {
      this.intitForm();
    });
  }

  generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  

}
