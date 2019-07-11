import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  public formAddBook: FormGroup;
  constructor(
    private _toastr: ToastrService
  ) { 
  }

  ngOnInit() {
    this.intitForm();
  }

  onSubmit(){
    if(this.isBookInfoValid()){
      let key = 'mystore';
      let newBook = this.formAddBook.value;
      console.log(newBook);
      
      let Books: Array<any> = [];
      if(JSON.parse(localStorage.getItem(key))){
        Books = JSON.parse(localStorage.getItem(key));
      }
      Books.push(newBook);
      localStorage.setItem(key,JSON.stringify(Books));
      this.showSuccess();
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
