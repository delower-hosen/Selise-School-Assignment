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

  addToCart(book: any){
    let previousBooks: Array<any> = JSON.parse(localStorage.getItem(this.storeKey))?JSON.parse(localStorage.getItem(this.storeKey)):[];
    previousBooks.push(book);
    localStorage.setItem(this.cartKey, JSON.stringify(previousBooks));
    this.bookItems++;
    localStorage.setItem(this.quantityKey, JSON.stringify(this.bookItems));
    this._cartService.emitNavChangeEvent(this.bookItems);
  }

}
