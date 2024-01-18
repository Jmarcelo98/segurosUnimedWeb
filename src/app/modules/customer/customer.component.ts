import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/core/Customer';
import { Paginator } from 'src/app/core/Paginator';
import { CustomerAddEditComponent } from 'src/app/shared/components/customer-add-edit/customer-add-edit.component';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { IPaginator } from 'src/app/shared/components/paginator/paginator.component';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, public dialog: MatDialog) {
    this.customers = this.activatedRoute.snapshot.data.customerResolver;
  }

  ngOnInit(): void {
    this.paginator.pageIndex = this.customers.number;
    this.paginator.totalElements = this.customers.totalElements;
  }

  customers: any;

  formSearch = new FormGroup({
    name: new FormControl(null, []),
    email: new FormControl(null, [Validators.email]),
    gender: new FormControl(null, []),
  });

  displayedColumns: string[] = ['name', 'email', 'gender', 'actions'];


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
      height: '450px',
      data: {
        objectEdit: null,
        title: 'Criar cliente',
        buttons: {
          primary: 'Criar',
        }
      },
    });
  }

  edit (element: any) {
    this.dialog.open(CustomerAddEditComponent, {
      width: '800px',
      height: '450px',
      data: {
        objectEdit: element,
        title: 'Editar cliente',
        buttons: {
          primary: 'Atualizar', 
          secondary: 'Cancelar', 
        }
      },
    });
  }

  delete(id: number) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {
        title: 'Atenção',
        text: 'Tem certeza que deseja excluir esse cliente?',
        buttons: {
          primary: 'Sim',
          secondary: 'Não',
        }
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.primary) {
        this.customerService.delete(id).subscribe(ret => {
          window.location.reload();
        })
      }
    });
  }

  public pageClick(paginator?: IPaginator) {
    this.paginator = paginator!;
    this.search();
  }


}
