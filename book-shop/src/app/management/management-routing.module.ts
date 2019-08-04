import { AddBookComponent } from './../management/components/add-book/add-book.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookManagementComponent } from './../management/components/book-management/book-management.component';
const routes: Routes = [
  {
    path: '',
    component: BookManagementComponent
  },
  {
    path: 'add-book',
    component: AddBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
