import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  constructor() { }

  getData(key: string): Array<object> {
    let Data = [];
    Data = JSON.parse(localStorage.getItem(key))? JSON.parse(localStorage.getItem(key)) : [];
    return Data;
  }

  setData(key: string, data: Array<object>){
    localStorage.setItem(key, JSON.stringify(data));
  }
}
