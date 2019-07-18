import { Component, OnInit } from '@angular/core';
import { defultConstant } from './../../config/constants/default.constant';
import { CartService } from './../../sevices/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public books: Array<any> = [];
  public cartKey = defultConstant.Keys.CartKey;
  constructor(
    private _cartService: CartService
  ) { }

  ngOnInit() {
    this.getBooks();

  }

  getBooks(){
    this.books = JSON.parse(localStorage.getItem(this.cartKey));
    console.log(this.books);
  }
  removeBook(book){
    debugger;
    let cart: Array<any> = [];
    let numberofbooks: number = book.quantity;
    cart = JSON.parse(localStorage.getItem(this.cartKey))?JSON.parse(localStorage.getItem(this.cartKey)):[];
    for(let index = 0; index < cart.length; index++){
      if(cart[index].bookId == book.bookId){
        cart.splice(index,1);
      }
    }
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.getBooks();
    this._cartService.emitCartDeleteEvent(numberofbooks);
    console.log(book);
  }

}
