import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdresseAddEditComponent } from 'src/app/shared/components/adresse-add-edit/adresse-add-edit.component';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { AdresseService } from 'src/app/shared/services/adresse.service';

@Component({
  selector: 'app-adresse-list',
  templateUrl: './adresse-list.component.html',
  styleUrls: ['./adresse-list.component.css']
})
export class AdresseListComponent {

  @Input()
  adresses: any

  constructor(public dialog: MatDialog, private adresseService: AdresseService) {
  }

  displayedColumns: string[] = ['zipCode', 'locality', 'district', 'publicPlace', 'complement', 'uf', 'actions'];

  edit(element: any) {

    this.dialog.open(AdresseAddEditComponent, {
      width: '800px',
      height: '350px',
      data: {
        objectEdit: element,
        idCustomer: null,
        title: 'Editar endereço',
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
        text: 'Tem certeza que deseja excluir esse endereço?',
        buttons: {
          primary: 'Sim',
          secondary: 'Não',
        }
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.primary) {
        this.adresseService.delete(id).subscribe(ret => {
          window.location.reload();
        })
      }
    });

  }

}
