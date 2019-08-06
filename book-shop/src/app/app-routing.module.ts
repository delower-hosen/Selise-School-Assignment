import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard  } from './shared-services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
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
    path: '404',
    component: NotFoundComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
