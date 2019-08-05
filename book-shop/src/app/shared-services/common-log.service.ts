import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonLogService {

  logChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  emitLogChangeEvent(x: number){
    this.logChange.emit(x);
  }

  getLogChangeEvent(){
    return this.logChange;
  }
}
