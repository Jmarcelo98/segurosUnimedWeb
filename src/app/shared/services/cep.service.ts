import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CepService extends BaseService{

  constructor(private http: HttpClient) { 
    super('search-cep')
  }

  findByCep(cep: any) {
    return this.http.get<any>(`${this.endPoint}/${cep}`)
  }

}
