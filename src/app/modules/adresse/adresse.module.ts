import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdresseComponent } from './adresse.component';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskPipe } from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdresseListComponent } from './adresse-list/adresse-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomerRoutingModule } from '../customer/customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdresseComponent,
    AdresseListComponent
  ],
  exports: [AdresseComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatIconModule,
    NgxMaskPipe
  ]
})
export class AdresseModule { }
