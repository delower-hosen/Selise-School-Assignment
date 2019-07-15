import { CartService } from './../../sevices/cart.service';
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
  public storeKey = defultConstant.Keys.StoreKey;
  public cartKey = defultConstant.Keys.CartKey;
  public quantityKey = defultConstant.Keys.QuantityKey;
  public bookItems: number = 0;
  constructor(
    private _cartService: CartService
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(){
    this.books = JSON.parse(localStorage.getItem(this.storeKey));
  }

  addToCart(book){
    localStorage.setItem(this.cartKey, JSON.stringify(book));
    this.bookItems++;
    localStorage.setItem(this.quantityKey, JSON.stringify(this.bookItems));
    debugger;
    this._cartService.emitNavChangeEvent(this.bookItems);
  }

}
