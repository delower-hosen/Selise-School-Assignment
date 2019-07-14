import { Component, OnInit } from '@angular/core';
import { defultConstant } from './../../config/constants/default.constant';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public books: Array<any> = [];
  
  constructor() { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(){
    this.books = JSON.parse(localStorage.getItem('mystore'));
  }

  addToCart(book){
    localStorage.setItem('mycart', JSON.stringify(book));
  }

}
