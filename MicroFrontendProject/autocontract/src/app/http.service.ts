import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataContract } from './dataContract';
  
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
     
    postDataContract(contract: dataContract){
        const body = {namecontract: contract.namecontract, nameclient: contract.nameclient, namecar: contract.namecar, costcar: contract.costcar};
        return this.http.post('http://localhost:8000/register/contract', body); 
    }
}