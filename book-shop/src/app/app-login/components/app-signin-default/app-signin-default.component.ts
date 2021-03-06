import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-signin-default',
  templateUrl: './app-signin-default.component.html',
  styleUrls: ['./app-signin-default.component.scss']
})
export class AppSigninDefaultComponent implements OnInit {
  public coverPhoto: string;
  public selectedStettingMenu: string = 'login';
  public selectedMenuIndex = 0;
  constructor() { }

  ngOnInit() {
    this.coverPhoto = require('./../../../../assets/porfile/cover.jpg');
  }

  updateSelectedMenu(event) {
    // if (event.index == 0) this.selectedStettingMenu = 'login';
    // else if (event.index == 1) this.selectedStettingMenu = 'registration';
    if(event.index == 0) this.selectedMenuIndex = 0;
    else if(event.index == 1) this.selectedMenuIndex = 1;
  }

  updateSelectedIndex(index: number){
    this.selectedMenuIndex = index;
  }
}
