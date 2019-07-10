import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { getElementDepthCount } from '@angular/core/src/render3/state';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  constructor(
    private _snackBar = MatSnackBar,
  ) { 
  }

  ngOnInit() {

  }

  onSubmit(){
    if(this.isBookInfoValid()){
      this.openSnackBar('hello', 'bye');
      let key = 'mystore';
      let newBook = this.formAddBook.value;
      console.log(newBook);
      
      let Books: Array<any> = [];
      if(JSON.parse(localStorage.getItem(key))){
        Books = JSON.parse(localStorage.getItem(key));
      }
      Books.push(newBook);
      localStorage.setItem(key,JSON.stringify(Books));
      this.formAddBook.reset();
    }
  }

  formAddBook = new FormGroup({
    bookname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    authorname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    imageurl: new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')])
  });
  
  get bookname(){
    return this.formAddBook.get('bookname');
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

  openSnackBar(message: string, action: string) {
    // this._snackBar.open(message, action, {
    //   duration: 2000,
    // });
  }

}
