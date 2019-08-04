import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import { CommonDataService } from './services/common-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Book-Shop';
  public loggedIn: boolean = false;
  public currentUser = {};
  // mode = new FormControl('over');
  constructor(
    private _commonDataService: CommonDataService
  ){}
  ngOnInit(): void {
    this.isLoggedIn();
  }
  
  isLoggedIn(){
    let token = JSON.parse(localStorage.getItem('accessToken'));
    if(token){
      this.loggedIn = true;
      this._commonDataService.getCurrentUser().subscribe(res=>{
        debugger;
        console.log(res);
        this.currentUser = res;
      });
    }
  }

  onLogOut(){
    localStorage.removeItem('accessToken');
    this.loggedIn = false;
  }

}
