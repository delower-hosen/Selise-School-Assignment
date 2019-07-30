import { BookModel } from './../model/book-model';
import { Injectable } from '@angular/core';
import { debug } from 'util';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  public baseURL = 'http://localhost:3000/api/books';
  constructor(
    private _http: HttpClient
  ) { }

  getData(key: string): Array<object> {
    let Data = [];
    Data = JSON.parse(localStorage.getItem(key))? JSON.parse(localStorage.getItem(key)) : [];
    return Data;
  }

  setData(key: string, data: Array<object>){
    localStorage.setItem(key, JSON.stringify(data));
  }

  postBook(newbook: BookModel){
    let book = {};
    book['name'] = newbook.name;
    book['author'] = newbook.author;
    book['price'] = newbook.price;
    book['imageurl'] = newbook.imageurl;
    book['date'] = newbook.date;
    debugger;
    return this._http.post<any>(this.baseURL, book);
  }
}
