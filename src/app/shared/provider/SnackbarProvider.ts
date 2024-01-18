import { Injectable } from '@angular/core';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarProvider {
  constructor(private snackBar: MatSnackBar) {
  }

  public showSnackErro(msg: any) {
    this.showSnackBar(msg, 'snack-erro');
  }

  public showSnackSuccess(msg: any) {
    this.showSnackBar(msg, 'snack-sucesso');
  }

  public showSnackInfo(msg: any) {
    this.showSnackBar(msg, 'snack-info');
  }

  private showSnackBar(msg: any, type: any) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: type,  // 'snack-sucesso', // 'snack-erro', 'snack-info',
      duration: 5000,
      data: {
        text: msg
      }
    });
  }
}