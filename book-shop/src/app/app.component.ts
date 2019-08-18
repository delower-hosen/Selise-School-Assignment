import { CommonLogService } from './shared-services/common-log.service';
import { Component } from '@angular/core';
import { CommonDataService } from './shared-services/common-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Book-Shop';
  public loggedIn: boolean = false;
  public currentUser = {};
  public imageurl: string;
  
  constructor(
    private _commonDataService: CommonDataService,
    private _commonLogService: CommonLogService
  ){}
  ngOnInit(): void {
    this.isLoggedIn();
    this.imageurl = require('./../assets/porfile/user.jpg');
    this._commonLogService.getLogChangeEvent().subscribe(res=>{
      if(res){
        this.isLoggedIn();
        setTimeout(() => {
          this.loggedIn = true;
        }, 1000);
      }
    })
  }
  
  isLoggedIn(){
    let token = JSON.parse(localStorage.getItem('accessToken'));
    if(token){
      this.loggedIn = true;
      this._commonDataService.getCurrentUser().subscribe(res=>{
        console.log(res);
        this.currentUser = res;
      });
    }
  }

  onLogOut(){
    localStorage.removeItem('accessToken');
    this.loggedIn = false;
    this._commonLogService.emitLogChangeEvent(0);
  }

}
