import { BookModel } from '../model/book-model';
import { Injectable } from '@angular/core';
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
    let token = JSON.parse(localStorage.getItem('accessToken'));
    const headers = new HttpHeaders()
    .set('x-authentication-token', token)
    .set('Content-Type', 'application/json');

    return this._http.post<any>(this.baseURL, newbook, { headers: headers});
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

  registerUser(user: any): Observable<any> {
    let url = 'http://localhost:3000/api/users';
    return this._http.post<any>(url, user);
  }

  loginUser(user: any): Observable<any> {
    let url = 'http://localhost:3000/api/login';
    return this._http.post(url, user);
  }

  getCurrentUser(): Observable<any> {
    let url = 'http://localhost:3000/api/users/me';
    let token = JSON.parse(localStorage.getItem('accessToken'));
    const headers = new HttpHeaders()
    .set('x-authentication-token', token)
    .set('Content-Type', 'application/json');
    return this._http.get<any>(url, { headers: headers});
  }
}
