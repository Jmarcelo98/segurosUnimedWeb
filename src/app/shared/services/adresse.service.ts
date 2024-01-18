import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AdresseService extends BaseService {

  constructor(private http: HttpClient) {
    super('adresses')
  }

  findAllUf() {
    return this.http.get<any>(`${this.endPoint}/uf`)
  }

  create(form: any, idCustomer: number) {
    return this.http.post<any>(`${this.endPoint}/${idCustomer}`, form)
  }

  update(form: any) {
    return this.http.patch(`${this.endPoint}`, form);
  }

  delete(id: number) {
    return this.http.delete(`${this.endPoint}/${id}`)
  }

}
