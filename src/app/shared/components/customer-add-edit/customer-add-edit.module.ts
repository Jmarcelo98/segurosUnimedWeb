import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAddEditComponent } from './customer-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SnackbarModule } from '../snackbar/snackbar.module';



@NgModule({
  declarations: [CustomerAddEditComponent],
  exports: [CustomerAddEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    SnackbarModule
  ]
})
export class CustomerAddEditModule { }
