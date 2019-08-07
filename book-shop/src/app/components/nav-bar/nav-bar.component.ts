import { CommonDataService } from '../../shared-services/common-data.service';
import { defaultConstant } from './../../config/constants/default.constant';
import { CartService } from '../../shared-services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonLogService } from 'src/app/shared-services/common-log.service';

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
  public loggedIn: boolean = false;

  constructor(
    private _cartService: CartService,
    private _commonDataService: CommonDataService,
    private _commonLogService: CommonLogService
  ) {
    this._unsubscribeAll = new Subject();
   }

  ngOnInit() {
    this.isLoggedIn();
    this._commonLogService.getLogChangeEvent().subscribe(res => {
      if(res) this.loggedIn = true;
      else this.loggedIn = false;
    });

    this._cartService.getCartDeleteEmitter().subscribe(deletedbooks=>{
      this.deleteBooks(deletedbooks);
    });

    this.numberOfBooks = this.getQuantity();

    this._cartService.getNavChangeEmitter().subscribe(totalPurchase => 
      this.numberOfBooks = this.getQuantity());
  }

  deleteBooks(quantity: number){
    this.numberOfBooks -= 1;
  }

  getQuantity(){
    let cart: Array<any> = [];
    let len = 0;
    cart = this._commonDataService.getData(this.cartKey);
    cart = cart? cart : [];
    for(let c of cart){
      if(c && c.quantity) len++;
    }
    return len;
  }

  selectTab(tab: any){
    this.selectedTab = tab;
  }

  isLoggedIn(){
    let token = JSON.parse(localStorage.getItem('accessToken'));
    if(token){
      this.loggedIn = true;
    }
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
