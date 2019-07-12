import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from "rxjs/operators";
import { CorporateEmployee } from './../model/book-model';

// const companyData = [
//   {
//       "name": "Ethel Price",
//       "gender": "female",
//       "company": "Johnson, Johnson and Partners, LLC CMP DDC",
//       "age": 22
//   },
//   {
//       "name": "Claudine Neal",
//       "gender": "female",
//       "company": "Sealoud",
//       "age": 55
//   }
// ];
const Data = JSON.parse(localStorage.getItem('mystore'));
const companyData = [];
for(let data of Data){
  let boo = {
    "name": data.bookname,
    "author": data.authorname,
    "price": data.price,
    "ImageUrl": data.imageurl
  };

  companyData.push(boo);
  
}

class PagedData<T> {
  data: T[];
}

@Injectable({
  providedIn: 'root'
})
export class MockServerResultsServiceService {

  public getResults(

    offset: number,
    limit: number
  ): Observable<PagedData<any>> {
    return of(companyData.slice(offset, offset + limit)).pipe(
      delay(new Date(Date.now() + 500)),
      map(data => ({ data }))
    );
  }

  constructor() { }
}
