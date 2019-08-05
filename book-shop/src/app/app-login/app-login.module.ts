import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLoginRoutingModule } from './app-login-routing.module';
import { AppLoginDefaultComponent } from './components/app-login-default/app-login-default.component';
import { MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, MatTabsModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSigninDefaultComponent } from './components/app-signin-default/app-signin-default.component';
import { AppRegistrationComponent } from './components/app-registration/app-registration.component';

@NgModule({
  declarations: [AppLoginDefaultComponent, AppSigninDefaultComponent, AppRegistrationComponent],
  imports: [
    CommonModule,
    AppLoginRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule
  ]
})
export class AppLoginModule { }
