import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  // public formAddBook: FormGroup
  constructor(
  ) { 
    // this.formAddBook = new FormGroup({});
  }

  ngOnInit() {

  }

  bookInfo = {};
  addBook(){
    if(this.formAddBook.valid){
      console.log(this.bookInfo);
      this.formAddBook.reset();
      
    }
    
  }

  formAddBook = new FormGroup({
    BookName: new FormControl(null, Validators.required),
    AuthorName: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    ImageUrl: new FormControl('', Validators.required)
  });
  
  get BookName(){
    return this.formAddBook.get('BookName');
  }

  get getFormErrors() {
    return this.formAddBook.controls;
  }

}
