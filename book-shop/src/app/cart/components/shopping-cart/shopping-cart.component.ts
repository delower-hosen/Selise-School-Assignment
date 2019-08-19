import { CartService } from '../../../shared-services/cart.service';
import { defaultConstant } from './../../../config/constants/default.constant';
import { ManagementService } from 'src/app/shared-services/management.service';
import { Component, OnInit } from '@angular/core';
import { CommonDataService } from 'src/app/shared-services/common-data.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public books: Array<any> = [];
  public booksLength: number = 0;
  public cartKey = defaultConstant.Keys.CartKey;
  public storeKey = defaultConstant.Keys.StoreKey;
  public isNegative: boolean = false;
  constructor(
    private _cartService: CartService,
    private _commonDataService: CommonDataService,
    private _managementService: ManagementService
  ) { }

  ngOnInit() {
    this._managementService.getTableUpdateEvent().subscribe(book => {
      this.updateCart(book);
    })
    this.getBooks();
  }

  updateCart(book: any){
    let Cart = [];
    Cart = this._commonDataService.getData(this.cartKey);
    for(let index = 0; index < Cart.length; index++){
      if(Cart[index].bookid == book.bookid){
        let temp = Cart[index].quantity;
        Cart[index] = book;
        Cart[index].quantity = temp;
      }
    }
    this._commonDataService.setData(this.cartKey, Cart);
  }

  getBooks(){
    this.books = this._commonDataService.getData(this.cartKey);
    this.booksLength = this.books.length? this.books.length : 0;
    for(let index = 0; index < this.booksLength; index++){
      if(this.books[index].quantity<=0){
        this.books.splice(index,1);
      }
    }
    this.booksLength = this.books.length? this.books.length : 0;
    if(!this.booksLength) localStorage.removeItem(this.cartKey);
    else   this._commonDataService.setData(this.cartKey, this.books);
  }
  removeBook(book){
    let cart: Array<any> = [];
    let numberofbooks: number = book.quantity;
    cart = this._commonDataService.getData(this.cartKey);
    cart = cart? cart : [];
    for(let index = 0; index < cart.length; index++){
      if(cart[index].bookid == book.bookid){
        cart.splice(index,1);
      }
    }
    this._commonDataService.setData(this.cartKey, cart);
    this.getBooks();
    this._cartService.emitCartDeleteEvent(numberofbooks);
  }

  changeQuantityBy(book:any, updatedQuantityBy:number){
    if(updatedQuantityBy==1) this.isNegative = false;
    if(book.quantity >= 1){
      let cart: Array<any> = [];
      let updatedQuantity = 0;
      cart = this._commonDataService.getData(this.cartKey);
      cart = cart? cart : [];

      for(let index = 0; index < cart.length; index++){
        if(cart[index].bookid == book.bookid){
          cart[index].quantity += updatedQuantityBy;
          updatedQuantity = cart[index].quantity;
        }
      }
      if(updatedQuantity){
      this._commonDataService.setData(this.cartKey, cart);
      this.getBooks();
      this._cartService.emitChangeOfCartQuantity(updatedQuantityBy);
      }
      else{
        alert('Enter a positive number or discard the product');
        // this.isNegative = true;
        // setTimeout(() => {
        //   this.isNegative = false;
        // }, 5000);
      }
    }
  }

}
