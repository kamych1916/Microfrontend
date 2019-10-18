import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataContract } from './dataContract';
// import { Globals } from './global'
   
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
     
    postDataContract(contract: dataContract){
        // contract.namecontract = Globals.nameClient
        const body = {namecontract: contract.namecontract, nameclient: contract.nameclient, namecar: contract.namecar, costcar: contract.costcar, namecontractrider: contract.namecontractrider, countroomsrider: contract.countroomsrider};
        return this.http.post('http://localhost:8000/register/contract', body); 
    }
}