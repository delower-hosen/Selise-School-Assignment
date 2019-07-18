import { defultConstant } from './../../config/constants/default.constant';
import { CartService } from './../../sevices/cart.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  numberOfBooks: number = 0;
  subscription: Subscription;
  subscriptionDelete: Subscription;
  public x: number;
  public cartKey = defultConstant.Keys.CartKey;
  constructor(
    private _cartService: CartService
  ) { }

  ngOnInit() {
    this._cartService.getCartDeleteEmitter().subscribe(deletedbooks=>{
      this.deleteBooks(deletedbooks);
    })
    this.numberOfBooks = this.getQuantity();
    this.subscription = this._cartService.getNavChangeEmitter().subscribe(totalPurchase => this.selectedNavItem(totalPurchase));
  }
  selectedNavItem(totalPurchase: number){
    this.numberOfBooks = totalPurchase;
  }
  deleteBooks(quantity: number){
    this.numberOfBooks -= quantity;
  }

  getQuantity(){
    let cart: Array<any> = [];
    cart = JSON.parse(localStorage.getItem(this.cartKey))?JSON.parse(localStorage.getItem(this.cartKey)):[];
    let total: number = 0;
    for(let c of cart){
      total += c.quantity;
    }
    return total;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
