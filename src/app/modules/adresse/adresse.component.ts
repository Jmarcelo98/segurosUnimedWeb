import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdresseAddEditComponent } from 'src/app/shared/components/adresse-add-edit/adresse-add-edit.component';

@Component({
  selector: 'app-adresse',
  templateUrl: './adresse.component.html',
  styleUrls: ['./adresse.component.css']
})
export class AdresseComponent {

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {

    this.route.paramMap.subscribe(params => {
      this.idCustomer = params.get('id');
    })

  }

  @Input()
  adresses: any

  idCustomer: any;

  create() {

    this.dialog.open(AdresseAddEditComponent, {
      width: '800px',
      height: '350px',
      data: {
        objectEdit: null,
        idCustomer: this.idCustomer,
        title: 'Cadastrar endereço',
        buttons: {
          primary: 'Cadastrar',
        }
      },
    });
  }

}
