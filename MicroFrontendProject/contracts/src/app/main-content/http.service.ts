import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataContracts } from './dataContracts';

@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
     
    postDataContract(contract: dataContracts){
        // contract.namecontract = Globals.nameClient
        const body = {namecontract: contract.namecontract, nameclient: contract.nameclient};
        return this.http.post('http://localhost:8000/search/contract', body); 
    }
}