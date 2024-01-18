import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAddEditComponent } from './customer-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';



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
    MatRadioModule,
    MatButtonModule,
    NgxMaskDirective,
    NgxMaskPipe
  ]
})
export class CustomerAddEditModule { }
