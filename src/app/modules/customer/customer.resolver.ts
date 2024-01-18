import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/core/Customer';
import { Paginator } from 'src/app/core/Paginator';
import { CustomerService } from 'src/app/shared/services/customer.service';


@Injectable({
  providedIn: 'root'
})


export class CustomerResolver implements Resolve<Customer[]> {

  constructor(private customerService: CustomerService){}

  paginator: Paginator = {
    pageIndex: 0,
    totalElements: 0,
    pageSize: 5,
  }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.customerService.findAll(this.paginator);
  }
}