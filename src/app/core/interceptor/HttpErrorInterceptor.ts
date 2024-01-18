import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';



@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar) {
    }

    private configError: MatSnackBarConfig = {
        panelClass: ['style-error'],
    };


    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {

                if (error.status === 400) {
                    // Implemente sua msg amigável
                    this.snackBar.open(error.error.description, "X", this.configError);
                } 

                else if (error.status === 404) {
                    // Implemente sua msg amigável
                    this.snackBar.open(error.error.description, "X", this.configError);
                } 


                return throwError(error);
            })
        );
    }
}