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

  findAll(paginator: Paginator) {

    var params = this.setPageToHttpParam(paginator)

    return this.http.get<any>(`${this.endPoint}`, {params: params})
  }

  delete(id: number) {
    return this.http.delete(`${this.endPoint}/${id}`)
  }

}
