import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  navchange: EventEmitter<number> = new EventEmitter();
  cartdelete: EventEmitter<number> = new EventEmitter();
  
  constructor() { }

  emitNavChangeEvent(totalPurchase: number) {
    this.navchange.emit(totalPurchase);
  }
  getNavChangeEmitter() {
    return this.navchange;
  }

  emitCartDeleteEvent(quantity: number){
    this.cartdelete.emit(quantity);
  }
  getCartDeleteEmitter(){
    return this.cartdelete;
  }
}
