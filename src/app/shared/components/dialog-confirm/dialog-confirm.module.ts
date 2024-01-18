import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmComponent } from './dialog-confirm.component';



@NgModule({
  declarations: [
    DialogConfirmComponent
  ],
  exports: [
    DialogConfirmComponent
  ],
  imports: [
    CommonModule
  ]
})

export class DialogConfirmModule { }
