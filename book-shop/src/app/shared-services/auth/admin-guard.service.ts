import { Observable } from 'rxjs';
import { AdminService } from './admin.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this._adminService.isUserAdmin().pipe(map(res=>{
      if(res) return true;
      else{
        this._router.navigate(['/home']);
        return false;
      }
    }))
}
}
