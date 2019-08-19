import { AuthService } from './../../../shared-services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../../shared-services/common-data.service';
import { CommonLogService } from 'src/app/shared-services/common-log.service';
import { defaultConstant } from 'src/app/config/constants/default.constant';

@Component({
  selector: 'app-login-default',
  templateUrl: './app-login-default.component.html',
  styleUrls: ['./app-login-default.component.scss']
})
export class AppLoginDefaultComponent implements OnInit {
  public loginForm: FormGroup;
  public coverPhoto: string;
  public wrongEmailPassword: boolean = false;
  public accessToken = defaultConstant.User.AccessToken;

  constructor(
    private _commonDataService: CommonDataService,
    private _router: Router,
    private _commonLogService: CommonLogService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.intitForm();
    this.coverPhoto = require('./../../../../assets/porfile/cover.jpg');
    if(this._authService.isAuthenticated()){
      this._router.navigate(['/home']);
    }
  }

  intitForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.email, Validators.minLength(5)]),
      password: new FormControl('', [ Validators.required, Validators.minLength(5) ])
    });
  }

  onSubmit(){
    let user = this.loginForm.value;
    console.log(user);
    this._commonDataService.loginUser(user).subscribe(res=>{
      if(res.isInvalid){
        this.wrongEmailPassword = true;
        this.intitForm();
      }
      else if(!res.isInvalid){
        this._commonLogService.emitLogChangeEvent(1);
        // localStorage.setItem(this.accessToken, JSON.stringify(res));
        this._commonDataService.setData(this.accessToken, res);
        this._router.navigate(['/home']);
      }
    });
  }

  get getFormErrors() {
    return this.loginForm.controls;
  }

}
