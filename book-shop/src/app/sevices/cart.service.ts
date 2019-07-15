import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  navchange: EventEmitter<number> = new EventEmitter();
  
  constructor() { }

  emitNavChangeEvent(totalPurchase: number) {
    this.navchange.emit(totalPurchase);
  }
  getNavChangeEmitter() {
    return this.navchange;
  }
}
