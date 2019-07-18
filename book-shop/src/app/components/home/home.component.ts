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
    debugger;
    this.bookItems = 0;
    let previousBooks: Array<any> = JSON.parse(localStorage.getItem(this.cartKey))?JSON.parse(localStorage.getItem(this.cartKey)):[];
    let doesExist: boolean = false;
    for(let previousbook of previousBooks){
      if(previousbook.bookId == book.bookId){
        doesExist = true;
        previousbook.quantity++;
        localStorage.setItem(this.cartKey, JSON.stringify(previousBooks));
      }
      this.bookItems += previousbook.quantity;
    }
    if(!doesExist){
      previousBooks.push(book);
      book.quantity = 1;
      localStorage.setItem(this.cartKey, JSON.stringify(previousBooks));
      this.bookItems += book.quantity;
    }
    // this.bookItems++;
    // localStorage.setItem(this.quantityKey, JSON.stringify(this.bookItems));
    this._cartService.emitNavChangeEvent(this.bookItems);
  }

}
