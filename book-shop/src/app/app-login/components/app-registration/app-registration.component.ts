import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonDataService } from 'src/app/shared-services/common-data.service';
import { CommonLogService } from 'src/app/shared-services/common-log.service';

@Component({
  selector: 'app-registration',
  templateUrl: './app-registration.component.html',
  styleUrls: ['./app-registration.component.scss']
})
export class AppRegistrationComponent implements OnInit {
  public loginForm: FormGroup;
  public duplicateEmail: boolean = false;
  public isChecked: boolean = false;
  constructor(
    private _commonDataService: CommonDataService,
    private _commonLogService: CommonLogService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.intitForm();
  }

  intitForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.email, Validators.minLength(5)]),
      password: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
      name: new FormControl('', [ Validators.required, Validators.minLength(3) ])
    });
  }

  onSubmit(){
    let user = this.loginForm.value;
    this._commonDataService.registerUser(user).subscribe(res=>{
      debugger;
      if(res.driver){
        this.duplicateEmail = true;
      }
      else{
        setTimeout(() => {
          if(res){
            this._commonLogService.emitLogChangeEvent(1);
            localStorage.setItem('accessToken', JSON.stringify(res));
            this._router.navigate(['/home']);
          }
        }, 1000);
      }
    })
  };

  checked(){
    debugger;
    this.isChecked = !this.isChecked;
    console.log(this.isChecked);
  }

  get getFormErrors() {
    return this.loginForm.controls;
  }

}
