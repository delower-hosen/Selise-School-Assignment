import { defultConstant } from './../../config/constants/default.constant';
import { CartService } from './../../sevices/cart.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  numberOfBooks: number = 0;
  subscription: Subscription;
  subscriptionDelete: Subscription;
  subscriptionChange: Subscription;
  public x: number;
  public cartKey = defultConstant.Keys.CartKey;
  public selectedTab: string;
  public href;
  constructor(
    private _cartService: CartService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._cartService.getCartDeleteEmitter().subscribe(deletedbooks=>{
      this.deleteBooks(deletedbooks);
    });
    // this._cartService.getChangeOfCartQuantity().subscribe(response=>{
    //   this.numberOfBooks = this.getQuantity();
    // })
    this.numberOfBooks = this.getQuantity();
    this.subscription = this._cartService.getNavChangeEmitter().subscribe(totalPurchase => 
      this.numberOfBooks = this.getQuantity());
  }
  // selectedNavItem(totalPurchase: number){
  //   this.numberOfBooks = totalPurchase;
  // }
  deleteBooks(quantity: number){
    this.numberOfBooks -= 1;
  }

  getQuantity(){
    let cart: Array<any> = [];
    cart = JSON.parse(localStorage.getItem(this.cartKey))?JSON.parse(localStorage.getItem(this.cartKey)):[];
    // let total: number = 0;
    // for(let c of cart){
    //   total += 1;
    // }
    return cart.length;
  }

  selectTab(tab: any){
    this.selectedTab = tab;
    // debugger;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionDelete.unsubscribe();
    this.subscriptionChange.unsubscribe();
  }

}
