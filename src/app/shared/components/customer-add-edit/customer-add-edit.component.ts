import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CepService } from '../../services/cep.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.css']
})
export class CustomerAddEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CustomerAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private customerService: CustomerService,
    private cepService: CepService, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {

    this.disableFields(this.formCustomer);

    if (this.data.objectEdit != null) {
      this.patchForm(this.data.objectEdit)
    }
  }

  formCustomer = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email]),
    gender: new FormControl(null, [Validators.required]),
    adresse: this.formBuilder.group({
      cep: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      publicPlace: new FormControl(null, [Validators.required]),
      complement: new FormControl(null),
      district: new FormControl('', [Validators.required]),
      locality: new FormControl(null, [Validators.required]),
      uf: new FormControl(null, [Validators.required]),
    })


  });

  addCustomer() {

    if (this.formCustomer.get('adresse.cep')?.valid) {

      this.customerService.create(this.formCustomer.getRawValue()).subscribe(suc => {
        this.openSnackBar("Cliente cadastrado com sucesso", this.configSuccess);
        this.dialogRef.close()

        setTimeout(() => {
          window.location.reload();
        }, 1200);

      }, err => {
        console.log(err);
      })

    } else {
      this.validaCampos(this.formCustomer)
    }

  }


  editCustomer() {

    if (this.formCustomer.valid) {

      this.customerService.update(this.formCustomer.getRawValue()).subscribe(suc => {
        this.openSnackBar('Cliente atualizado com sucesso', this.configSuccess);
        this.dialogRef.close()
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }, err => {
        console.log(err);
      })
    } else {
      this.validaCampos(this.formCustomer)
    }

  }

  searchAdresse() {

    if (this.formCustomer.controls.adresse.controls.cep.valid) {

      this.cepService.findByCep(this.formCustomer.get('adresse.cep')?.value).subscribe(res => {

        this.formCustomer.get('adresse.publicPlace')?.setValue(res.logradouro)
        this.formCustomer.get('adresse.complement')?.setValue(res.complemento)
        this.formCustomer.get('adresse.district')?.setValue(res.bairro)
        this.formCustomer.get('adresse.locality')?.setValue(res.localidade)
        this.formCustomer.get('adresse.uf')?.setValue(res.uf)

        this.patchForm(this.formCustomer)

      })

    }


  }


  patchForm(form: any) {
    this.formCustomer.patchValue(form)
  }

  validaCampos(form: FormGroup) {
    const controls = Object.keys(form.controls);
    for (const control of controls) {
      form.controls[control].updateValueAndValidity();
    }
  }

  disableFields(form: any) {

    this.formCustomer.get('adresse.publicPlace')?.disable();
    this.formCustomer.get('adresse.complement')?.disable();
    this.formCustomer.get('adresse.district')?.disable();
    this.formCustomer.get('adresse.locality')?.disable();
    this.formCustomer.get('adresse.uf')?.disable();

  }

  cancelClick() {
    this.dialogRef.close({ secondary: true });
  }

  primaryClick() {
    this.dialogRef.close({ primary: true });
  }

  onNoClick(): void {
    this.dialogRef.close({ close: true });
  }

  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
  };


  openSnackBar(message: string, config: MatSnackBarConfig) {
    this.snackBar.open(message, "X", config);
  }

}
