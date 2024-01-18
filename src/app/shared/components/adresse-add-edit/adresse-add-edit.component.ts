import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CepService } from '../../services/cep.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AdresseService } from '../../services/adresse.service';

@Component({
  selector: 'app-adresse-add-edit',
  templateUrl: './adresse-add-edit.component.html',
  styleUrls: ['./adresse-add-edit.component.css']
})
export class AdresseAddEditComponent implements OnInit {

  formAdresse = new FormGroup({
    id: new FormControl(null, []),
    zipCode: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    publicPlace: new FormControl(null, []),
    complement: new FormControl(null),
    district: new FormControl('', []),
    locality: new FormControl(null, []),
    uf: new FormControl(null, []),
  });

  constructor(public dialogRef: MatDialogRef<AdresseAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cepService: CepService,
    private snackBar: MatSnackBar, private adresseService: AdresseService) {
  }

  id: any;

  ngOnInit(): void {

    this.disableFields()

    if (this.data.objectEdit != null) {
      this.patchForm(this.data.objectEdit)
    }

    if(this.data.idCustomer != null) {
      this.id = this.data.idCustomer;
    }

  }

  onNoClick(): void {
    this.dialogRef.close({ close: true });
  }

  cancelClick() {
    this.dialogRef.close({ secondary: true });
  }

  openSnackBar(message: string, config: MatSnackBarConfig) {
    this.snackBar.open(message, "X", config);
  }

  addAdresse() {

    if (this.formAdresse.valid) {      

      this.adresseService.create(this.formAdresse.getRawValue(), Number( this.id)).subscribe(suc => {
        this.openSnackBar("Endereço cadastrado com sucesso", this.configSuccess);
        this.dialogRef.close()

        setTimeout(() => {
          window.location.reload();
        }, 2000);

      }, err => {
        console.log(err);
      })

    }

  }


  editAdresse() {

    console.log(this.formAdresse.getRawValue());
    

    if (this.formAdresse.valid) {

      this.adresseService.update(this.formAdresse.getRawValue()).subscribe(suc => {

        this.openSnackBar('Endereço atualizado com sucesso', this.configSuccess);
        this.dialogRef.close()
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }, err => {
        console.log(err);
      })
    }

  }

  patchForm(form: any) {
    this.formAdresse.patchValue(form)
  }


  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
  };

  disableFields() {

    this.formAdresse.get('publicPlace')?.disable();
    this.formAdresse.get('complement')?.disable();
    this.formAdresse.get('district')?.disable();
    this.formAdresse.get('locality')?.disable();
    this.formAdresse.get('uf')?.disable();

  }

  searchAdresse() {

    if (this.formAdresse.valid) {

      this.cepService.findByCep(this.formAdresse.get('zipCode')?.value).subscribe(res => {

        this.formAdresse.get('publicPlace')?.setValue(res.logradouro)
        this.formAdresse.get('complement')?.setValue(res.complemento)
        this.formAdresse.get('district')?.setValue(res.bairro)
        this.formAdresse.get('locality')?.setValue(res.localidade)
        this.formAdresse.get('uf')?.setValue(res.uf)

        this.patchForm(this.formAdresse)

      })

    }


  }


}
