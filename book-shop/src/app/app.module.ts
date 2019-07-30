import { EditDatatableComponent } from './components/edit-datatable/edit-datatable.component';
import { ServerResultsService } from './services/serverResults.service';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatSnackBarModule, MatNativeDateModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { AddBookComponent } from './components/add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {MatSelectModule} from '@angular/material/select';
import { BookManagementComponent } from './components/book-management/book-management.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatBadgeModule} from '@angular/material/badge';
import {MatRadioModule} from '@angular/material/radio';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    HomeComponent,
    NavBarComponent,
    BookManagementComponent,
    ShoppingCartComponent,
    EditDatatableComponent
  ],
  entryComponents: [
    AddBookComponent,
    EditDatatableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule,
    NgxDatatableModule,
    MatRadioModule,
    MatBadgeModule,
    FilterPipeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'manage-book', component: BookManagementComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'add-book', component: AddBookComponent},
      { path: '**', component: HomeComponent}
    ])
  ],
  providers: [ServerResultsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
