import { BookModel } from './../model/book-model';
import { Injectable } from '@angular/core';
import { debug } from 'util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  public baseURL = 'http://localhost:3000/api/books';
  public data = [];
  public fakeData = [];
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

  postBook(newbook: BookModel): Observable<any>{
    debugger;
    return this._http.post<any>(this.baseURL, newbook);
  }

  getAllBooks(): Observable<any>{
    return this._http.get<any>(this.baseURL);
  }

  deleteBook(id: string): Observable<any>{
    let url = 'http://localhost:3000/api/books/' + id;
    return this._http.delete<any>(url);
  }

  updateBook(newbook: any): Observable<any> {
    let url = 'http://localhost:3000/api/books/' + newbook._id;
    return this._http.put<any>(url, newbook);
  }
}
