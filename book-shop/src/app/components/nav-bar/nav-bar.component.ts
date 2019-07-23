import { CommonDataService } from './../../services/common-data.service';
import { defaultConstant } from './../../config/constants/default.constant';
import { CartService } from '../../services/cart.service';
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
  public cartKey = defaultConstant.Keys.CartKey;
  public selectedTab: string;
  public href;
  constructor(
    private _cartService: CartService,
    private _router: Router,
    private _commonDataService: CommonDataService
  ) { }

  ngOnInit() {
    this._cartService.getCartDeleteEmitter().subscribe(deletedbooks=>{
      this.deleteBooks(deletedbooks);
    });

    this.numberOfBooks = this.getQuantity();

    this.subscription = this._cartService.getNavChangeEmitter().subscribe(totalPurchase => 
      this.numberOfBooks = this.getQuantity());
  }

  deleteBooks(quantity: number){
    this.numberOfBooks -= 1;
  }

  getQuantity(){
    let cart: Array<any> = [];
    cart = this._commonDataService.getData(this.cartKey);
    cart = cart? cart : [];
    return cart.length;
  }

  selectTab(tab: any){
    this.selectedTab = tab;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionDelete.unsubscribe();
    this.subscriptionChange.unsubscribe();
  }

}
