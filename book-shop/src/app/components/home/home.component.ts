import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public books: Array<any> = [];
  constructor() { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(){
    this.books = JSON.parse(localStorage.getItem('mystore'));
    console.log(this.books);
  }

}
