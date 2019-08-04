import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './app-login/app-login.module#AppLoginModule'
  },
  {
    path: 'home',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'shopping-cart',
    loadChildren: './cart/cart.module#CartModule'
  },
  {
    path: 'manage-book',
    loadChildren: './management/management.module#ManagementModule'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
