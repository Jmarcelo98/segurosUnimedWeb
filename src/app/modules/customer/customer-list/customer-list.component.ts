import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  displayedColumns: string[] = ['name', 'email', 'gender', 'actions'];

  @Input()
  customers: any

}
