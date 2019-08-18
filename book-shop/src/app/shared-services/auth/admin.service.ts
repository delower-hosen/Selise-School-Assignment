import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonDataService } from './../common-data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public currentUser;

  constructor(
    private _commonDataService: CommonDataService
  ) { }
  public isUserAdmin(): Observable<boolean>{
    return this._commonDataService.getCurrentUser().pipe(map(user => {
      debugger;
      if(user.isAdmin) return true;
      else return false;
    }));
  }
}
