import { CommonDataService } from '../../../shared-services/common-data.service';
import { CartService } from '../../../shared-services/cart.service';
import { Component, OnInit } from '@angular/core';
import { defaultConstant } from './../../../config/constants/default.constant';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public books: Array<any> = [];
  public storeKey = defaultConstant.Keys.StoreKey;
  public cartKey = defaultConstant.Keys.CartKey;
  public quantityKey = defaultConstant.Keys.QuantityKey;
  public bookItems: number = 0;
  public changeQuantity: number;
  constructor(
    private _cartService: CartService,
    private _commonDataService: CommonDataService
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(){
    this._commonDataService.getAllBooks().subscribe(res=>{
      this.books = res;
    })
  }

  addToCart(book: any){
    this.bookItems = 0;
    let previousBooks: Array<any> = this._commonDataService.getData(this.cartKey);
    let doesExist: boolean = false;
    book.isChecked = true;
    for(let previousbook of previousBooks){
      if(previousbook.bookid == book.bookid){
        doesExist = true;
        previousbook.quantity++;
        this._commonDataService.setData(this.cartKey, previousBooks);
      }
      this.bookItems += previousbook.quantity;
    }
    if(!doesExist){
      previousBooks.push(book);
      book.quantity = 1;
      this._commonDataService.setData(this.cartKey, previousBooks);
      this.bookItems += book.quantity;
      this._cartService.emitNavChangeEvent(this.bookItems);
    }
  }

}

