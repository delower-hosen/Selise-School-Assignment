import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { BookManagementComponent } from './components/book-management/book-management.component';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditDatatableComponent } from './../management/components/edit-datatable/edit-datatable.component';
import { AddBookComponent } from './components/add-book/add-book.component'

@NgModule({
  declarations: [BookManagementComponent, EditDatatableComponent, AddBookComponent],
  entryComponents: [
    EditDatatableComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MatIconModule,
    NgxDatatableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule
  ]
})
export class ManagementModule { }