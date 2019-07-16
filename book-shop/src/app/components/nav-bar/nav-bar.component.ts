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
  constructor(
    private _cartService: CartService
  ) { }

  ngOnInit() {
    this.subscription = this._cartService.getNavChangeEmitter().subscribe(totalPurchase => this.selectedNavItem(totalPurchase));
  }
  selectedNavItem(totalPurchase: number){
    this.numberOfBooks = totalPurchase;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
