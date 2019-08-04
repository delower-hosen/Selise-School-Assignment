import { MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    FlexModule
  ]
})
export class CartModule { }