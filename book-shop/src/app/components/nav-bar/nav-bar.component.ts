import { CommonDataService } from './../../services/common-data.service';
import { defaultConstant } from './../../config/constants/default.constant';
import { CartService } from '../../services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  numberOfBooks: number = 0;
  subscription: Subscription;
  private _unsubscribeAll: Subject<any>;
  public x: number;
  public cartKey = defaultConstant.Keys.CartKey;
  public selectedTab: string;

  constructor(
    private _cartService: CartService,
    private _commonDataService: CommonDataService
  ) {
    this._unsubscribeAll = new Subject();
   }

  ngOnInit() {
    this._cartService.getCartDeleteEmitter().subscribe(deletedbooks=>{
      this.deleteBooks(deletedbooks);
    });

    this.numberOfBooks = this.getQuantity();

    this._cartService.getNavChangeEmitter().pipe(takeUntil(this._unsubscribeAll)).subscribe(totalPurchase => 
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
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
