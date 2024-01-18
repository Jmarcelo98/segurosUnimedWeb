import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CustomerAddEditComponent } from 'src/app/shared/components/customer-add-edit/customer-add-edit.component';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent {

  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, public dialog: MatDialog) {
    this.customer = this.activatedRoute.snapshot.data.customerViewResolver;
    
  }

  customer: any;

  edit(element: any) {
    this.dialog.open(CustomerAddEditComponent, {
      width: '800px',
      height: '250px',
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

  gender(value: string): string {
    if (value === 'M') {
      return "Masculino"
    }
    return "Feminino"
  }

}
