import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  tableupdate: EventEmitter<any> = new EventEmitter();

  constructor() { }

  emitTableUpdateEvent(book: any) {
    this.tableupdate.emit(book);
  }
  getTableUpdateEvent() {
    return this.tableupdate;
  }
}
