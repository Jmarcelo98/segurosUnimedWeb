import { Injectable } from '@angular/core';
import { Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Customer } from 'src/app/core/Customer';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Injectable({
  providedIn: 'root'
})

export class CustomerViewResolver implements Resolve<Customer> {

  constructor(private customerService: CustomerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer> {
    return this.customerService.findById(route.params.id);
  }
}
