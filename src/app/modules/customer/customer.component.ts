import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Paginator } from 'src/app/core/Paginator';
import { CustomerAddEditComponent } from 'src/app/shared/components/customer-add-edit/customer-add-edit.component';
import { IPaginator } from 'src/app/shared/components/paginator/paginator.component';
import { AdresseService } from 'src/app/shared/services/adresse.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService,
    public dialog: MatDialog, private adresseService: AdresseService) {
    this.customers = this.activatedRoute.snapshot.data.customerResolver;
  }

  ngOnInit(): void {
    this.paginator.pageIndex = this.customers.number;
    this.paginator.totalElements = this.customers.totalElements;

    this.getAllUf();

  }

  ufs: [] = []

  customers: any;

  selectedUf: string = '';

  formSearch = new FormGroup({
    name: new FormControl(null, []),
    email: new FormControl(null, [Validators.email]),
    gender: new FormControl(null, []),
    locality: new FormControl(null, []),
    uf: new FormControl(null, []),
  });

  displayedColumns: string[] = ['name', 'email', 'gender', 'actions'];

  getAllUf() {
    this.adresseService.findAllUf().subscribe(res => {
      this.ufs = res;
    })
  }

  paginator: Paginator = {
    pageIndex: 0,
    totalElements: 0,
    pageSize: 5,
  }

  resetAfterFocus(value: string) {

    if (this.formSearch.get(value)?.value === '') {
      this.formSearch.get(value)?.setValue(null);
    }

  }

  search() {

    if (this.formSearch.valid) {

      this.customerService.findAllByFilter(this.formSearch.getRawValue(), this.paginator).subscribe(res => {

        this.paginator.pageIndex = res.number;
        this.paginator.totalElements = res.totalElements;
        this.customers = res;

      })

    }

  }

  create() {
    this.dialog.open(CustomerAddEditComponent, {
      width: '800px',
      height: '250px',
      data: {
        objectEdit: null,
        title: 'Criar cliente',
        buttons: {
          primary: 'Criar',
        }
      },
    });
  }


  public pageClick(paginator?: IPaginator) {
    this.paginator = paginator!;
    this.search();
  }


}
