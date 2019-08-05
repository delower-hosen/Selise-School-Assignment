import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard  } from './shared-services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './app-login/app-login.module#AppLoginModule'
  },
  {
    path: 'home',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'shopping-cart',
    loadChildren: './cart/cart.module#CartModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-book',
    loadChildren: './management/management.module#ManagementModule',
    canActivate: [AuthGuard]
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
