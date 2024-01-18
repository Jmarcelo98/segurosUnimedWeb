import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';

import { SimpleSnackBar  } from '@angular/material/snack-bar';



@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.css']
})
export class CustomerAddEditComponent {

  constructor(public dialogRef: MatDialogRef<CustomerAddEditComponent>, private snackBar: SnackbarProvider,
     @Inject(MAT_DIALOG_DATA) public data: any, private customerService: CustomerService) {
  }

  ngOnInit(): void {
    if (this.data.objectEdit != null) {
      this.patchForm(this.data.objectEdit)
    }
  }

  formType = new FormGroup({
    id: new FormControl(null),
    description: new FormControl(null, [Validators.required])
  });

  // type income
  addTypeIncome() {

    if (this.formType.valid) {

      this.typeIncomeService.create(this.formType.getRawValue()).subscribe(suc => {
        this.showSnackSucesso('Type of recipe successfully registered');
        this.dialogRef.close()

        setTimeout(() => {
          window.location.reload();
        }, 1200);

      }, err => {
        console.log(err);
      })

    } else {
      this.validaCampos(this.formType)
    }

  }


  editTypeIncome() {

    if (this.formType.valid) {

      this.typeIncomeService.update(this.formType.getRawValue()).subscribe(suc => {
        this.showSnackSucesso('Type of recipe successfully updated');
        this.dialogRef.close()
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }, err => {
        console.log(err);
      })
    } else {
      this.validaCampos(this.formType)
    }
  }

  // type expense
  editTypeExpense() {

  }

  addTypeExpense() {
    console.log("b");
  }

  patchForm(form: any) {
    this.formType.patchValue(form)
  }

  validaCampos(form: FormGroup) {
    const controls = Object.keys(form.controls);
    for (const control of controls) {
      form.controls[control].updateValueAndValidity();
    }
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

  showSnackSucesso(msg: string) {
    this.snackBar.showSnackSuccess(msg);
  }


}
