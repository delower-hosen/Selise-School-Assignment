import { Component, OnInit } from '@angular/core';
import { defultConstant } from './../../config/constants/default.constant';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public books: Array<any> = [];
  public cartKey = defultConstant.Keys.CartKey;
  constructor() { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(){
    this.books = JSON.parse(localStorage.getItem(this.cartKey));
    console.log(this.books);
  }

}
