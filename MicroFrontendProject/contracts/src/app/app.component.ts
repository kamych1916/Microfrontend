import { Component, Inject, OnDestroy } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { HttpService } from './http.service';
import { dataContracts } from './dataContracts';
import { Router } from '@angular/router';

import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service'

@Component({
  selector: 'contracts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService],
})
export class AppComponent{
  title = 'contracts';

  
  HomeIcon = assetUrl('Home_32.png')
  CalcIcon32 = assetUrl('Calc_32.png')
  PoliciesIcon32 = assetUrl('Policies_32.png')
  ClientsIcon = assetUrl('Clients_32.png')
  PoliciesSupportIcon32 = assetUrl('PoliciesSupport_32.png')
  PaymentsIcon32 = assetUrl('Payments_32.png')
  AgentsRegistryIcon32 = assetUrl('Agents_Registry_32.png')
  bsoIcon32 = assetUrl('bso_32.png')
  TaskIcon32 = assetUrl('Task_32.png')

  linkHeader = 'http://localhost:3000/main/header'
  linkFooter = 'http://localhost:3000/autocontract/footer'


  ResultNameContract: any
  ResultNameClient: any

  invisibleInp = "hidden"

  contract: dataContracts = new dataContracts(); // данные от пользователя
  
  receivedData: dataContracts; // полученные данные

  done: boolean = false;
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private httpService: HttpService, public router: Router){
    if(this.storage.get("token") == null) {
      this.router.navigate(['/auth'])
    }
  }
  search(contract: dataContracts ){
    this.httpService.postDataContract(contract)
            .subscribe(
              (data: dataContracts) => {this.receivedData=data; this.done=true, this.ResultNameContract = this.receivedData.namecontract, this.ResultNameClient = this.receivedData.nameclient, this.invisibleInp = "visible"},
              error => {alert('Договор не найден!')}
            );
  };

  postParamData(){
    this.router.navigate(['/auto/contract'], {queryParams: {ncontr: this.ResultNameContract, nclient: this.ResultNameClient}})
  }
  
  DataToMainForExit(event){
    if(event.detail == true){
      this.storage.remove("token");
      this.router.navigate(['/auth'])
    }
  }
  // ngOnDestroy(){
  //   window.location.reload();
  // }
}
