import { AppSigninDefaultComponent } from './components/app-signin-default/app-signin-default.component';
import { AppLoginDefaultComponent } from './components/app-login-default/app-login-default.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppSigninDefaultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLoginRoutingModule { }
