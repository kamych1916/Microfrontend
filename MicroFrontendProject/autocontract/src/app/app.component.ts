import { Component, Input, Inject, OnInit, AfterContentInit,  OnDestroy, OnChanges, SimpleChanges, SimpleChange, HostListener} from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { HttpService } from './http.service';
import { dataContract } from './dataContract'
import { Router, ActivatedRoute } from '@angular/router';

import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service'


@Component({
  selector: 'autocontract-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService],
})
export class AppComponent implements OnInit  {

  linkHeader = 'http://localhost:3000/autocontract/header';
  linkFooter = 'http://localhost:3000/autocontract/footer';
  linkModal  = 'http://localhost:3000/modal';
  linkRider  = 'http://localhost:3000/rider';
  BackIcon32 = assetUrl('Back_32.png')
  PolicyIcon32 = assetUrl('Policy_32.png')
  PrintIcon32 = assetUrl('Print_32.png')

  visibilityMainBtn = "none"
  visibilityRiderBlock = "none"
  visibilityContractBlock = "block"
  
  nameClient: "kek"
  sub: any  
  paramDataContr: any;
  paramDataClient: any;
  
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private httpService: HttpService, private route: ActivatedRoute, private router: Router){
    if(this.storage.get("token") == null) {
      this.router.navigate(['/auth'])
    }
  }
  
  ngOnInit() {
    this.sub = this.route
    .queryParams
    .subscribe(params => {
      console.log(params['ncontr'])
      this.paramDataContr = params['ncontr']
      console.log(params['nclient'])
      this.paramDataClient = params['nclient']
    });

    const self = this;
    window.addEventListener('connect-for-search', (event) => {
      this.customEventListenerFunction(self, event)
    }, true);
  }

  customEventListenerFunction(self, event) {
    self.nameClient = event.detail.scope.Result
    // console.log("parentComp: ", self.nameClient)
  }

  ngOnDestroy(): void {
    window.location.reload();
    window.removeEventListener('changeNameToCustomEvent', (event) => {this.customEventListenerFunction}, true);
  }

  contract: dataContract = new dataContract(); // данные от пользователя

  receivedData: dataContract; // полученные данные

  done: boolean = false;

  save(contract: dataContract, ){
    contract.nameclient = this.nameClient
    this.httpService.postDataContract(contract)
        .subscribe(
          (data: dataContract) => {this.receivedData=data; this.done=true, alert(this.receivedData.statmess)},
          error => {alert('что-то пошло не так!')}
        );
  };

  Exit(){
    this.storage.remove("token");
    this.router.navigate(['/auth'])
  }

  showRiderChekBox = false
  showRiderButton(){
    // const InnerNewElem = document.querySelector('#riderBlock')
    if(this.showRiderChekBox == false){
      this.visibilityMainBtn = "inline-block"
      // this.visibilityRiderBlock = "block"
      // this.visibilityContractBlock = "none"
      this.showRiderChekBox = true
      // const newElem = document.createElement('rider-webcomp') 
      // newElem.setAttribute('*' + 'axLazyElement', "linkRider")
      // // newElem[kek] = "linkRider"
      // InnerNewElem.appendChild(newElem)
    }else{
      // InnerNewElem.innerHTML = ""
      // this.visibilityMainBtn = "none" 
      this.showRiderChekBox = false
    }
  }
  showRider(){
    this.visibilityContractBlock = "none"
    this.visibilityRiderBlock = "block"
  }
  showContract(){
    this.visibilityContractBlock = "block"
    this.visibilityRiderBlock = "none"
  }
}

