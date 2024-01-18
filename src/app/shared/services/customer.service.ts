import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { HttpClient } from '@angular/common/http';
import { Paginator } from 'src/app/core/Paginator';

@Injectable({
  providedIn: 'root'
})

export class CustomerService extends BaseService{

  constructor(private http: HttpClient) { 
    super('customers')
  }

  findAllByFilter(form: any, paginator: Paginator) {
    var params = this.setPageToHttpParam(paginator)
    return this.http.post<any>(`${this.endPoint}/filter`, form, {params: params})
  }


  create(form: any) {
    return this.http.post(`${this.endPoint}`, form);
  }

  update(form: any) {
    return this.http.patch(`${this.endPoint}`, form);
  }

  delete(id: number) {
    return this.http.delete(`${this.endPoint}/${id}`)
  }

}
