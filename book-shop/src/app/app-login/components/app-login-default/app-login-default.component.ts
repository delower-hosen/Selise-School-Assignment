import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonDataService } from './../../../services/common-data.service';

@Component({
  selector: 'app-app-login-default',
  templateUrl: './app-login-default.component.html',
  styleUrls: ['./app-login-default.component.scss']
})
export class AppLoginDefaultComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private _commonDataService: CommonDataService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.intitForm();
  }

  intitForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.email, Validators.minLength(5)]),
      password: new FormControl('', [ Validators.required, Validators.minLength(5) ])
    });
  }

  onSubmit(){
    debugger;
    let user = this.loginForm.value;
    console.log(user);
    this._commonDataService.loginUser(user).subscribe(res=>{
      if(res){
        localStorage.setItem('accessToken', JSON.stringify(res));
      }
    });
  }

  get getFormErrors() {
    return this.loginForm.controls;
  }

}
