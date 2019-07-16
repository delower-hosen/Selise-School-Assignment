import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { defultConstant } from './../../config/constants/default.constant'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  public formAddBook: FormGroup;
  constructor(
    private _toastr: ToastrService,
    private dialogRef: MatDialogRef<AddBookComponent>
  ) { 
  }

  ngOnInit() {
    this.intitForm();
  }

  onSubmit(){
    if(this.isBookInfoValid()){
      // let key = 'mystore';
      let storeKey = defultConstant.Keys.StoreKey;
      let newBook = this.formAddBook.value;
      console.log(newBook);
      
      let Books: Array<any> = [];
      if(JSON.parse(localStorage.getItem(storeKey))){
        Books = JSON.parse(localStorage.getItem(storeKey));
      }
      Books.push(newBook);
      localStorage.setItem(storeKey, JSON.stringify(Books));
      this.showSuccess();
      this.dialogRef.close();
      this.resetForm();
    }
  }

  intitForm(){
    this.formAddBook = new FormGroup({
      bookname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      authorname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      imageurl: new FormControl('', [Validators.required])
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

}
