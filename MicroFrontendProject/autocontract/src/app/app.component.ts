import { Component, Inject , OnInit, AfterContentChecked, AfterContentInit} from '@angular/core';
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
export class AppComponent implements OnInit{

  IncludeRider = false

  linkHeader = 'http://localhost:3000/autocontract/header'
  linkFooter = 'http://localhost:3000/autocontract/footer'
  linkModal  = 'http://localhost:3000/modal'
  linkRider  = 'http://localhost:3000/rider'
  BackIcon32 = assetUrl('Back_32.png')
  PolicyIcon32 = assetUrl('Policy_32.png')
  PrintIcon32 = assetUrl('Print_32.png')

  visibilityMainBtn = "none"
  visibilityRiderBlock = "none"
  visibilityContractBlock = "block"
  
  nameClient: any
  sub: any  
  paramDataContr: any
  paramDataClient: any

  nameContractRider: any    
  countRoomsRider: any

  DataInputRiderChange(event){
    this.nameContractRider = event.detail.ChildNCR
    this.countRoomsRider = event.detail.ChildCR    
    // console.log('parent: ', this.countRoomsRider, " - ", this.nameContractRider)
  }
  
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private httpService: HttpService, private router: Router, private route: ActivatedRoute,){
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
    // Неработает пока что! Пытался связать через события микро прил. и веб-комп. Если в параметрах что то есть, то поле веб-комп. изменится.
    // const event: CustomEvent<any> = new CustomEvent('connect-for-input-clientname-from-params', this.paramDataClient);
    // window.dispatchEvent(event);
    
    const self = this;
    window.addEventListener('connect-for-search', (event) => {
      this.customEventListenerFunction(self, event)  
    }, true);


    // console.log(document.getElementById('webcomp').previousElementSibling)
  }
  
  customEventListenerFunction(self, event) {
    self.nameClient = event.detail.scope.Result
    // console.log("parentComp: ", self.nameClient)
  }
  // ngAfterContentChecked(){
  //   var el = document.getElementById('test');
  //   console.log(el)
  // }
  
  // ngOnDestroy(): void {
  //   var el = document.getElementById('test');
  //   el.parentNode.removeChild(el);
    
  //   // window.location.reload();
  //   window.removeEventListener('changeNameToCustomEvent', (event) => {this.customEventListenerFunction}, true);
  // }
  
  
  DataToAutoContractForExit(event){
    if(event.detail == true){
      this.storage.remove("token");
      this.router.navigate(['/auth'])
    }
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
      this.visibilityMainBtn = "none" 
      this.showRiderChekBox = false
    }
  }
  showRider(){
    this.IncludeRider = true
    // console.log(document.getElementsByTagName('rider-webcomp'))
    this.visibilityContractBlock = "none"
    this.visibilityRiderBlock = "block"
  }
  showContract(){
    this.visibilityContractBlock = "block"
    this.visibilityRiderBlock = "none"
  }


  contract: dataContract = new dataContract(); // данные от пользователя

  receivedData: dataContract; // полученные данные

  done: boolean = false;

  save(contract: dataContract, ){
    if(this.showRiderChekBox == true){
      if(this.nameContractRider == undefined || "" && this.countRoomsRider == undefined || "" ){
        alert("Пожалуйста заполните все поля в 'Квартира Эксперсс'")
      }else{
        contract.nameclient = this.nameClient
        contract.namecontractrider = this.nameContractRider
        contract.countroomsrider = this.countRoomsRider
        this.httpService.postDataContract(contract)
            .subscribe(
              (data: dataContract) => {this.receivedData=data; this.done=true, alert(this.receivedData.statmess)},
              error => {alert('что-то пошло не так!')}
            );
      }
    }else{
      contract.namecontractrider = undefined
      contract.countroomsrider = undefined
      contract.nameclient = this.nameClient
      this.httpService.postDataContract(contract)
          .subscribe(
            (data: dataContract) => {this.receivedData=data; this.done=true, alert(this.receivedData.statmess)},
            error => {alert('что-то пошло не так!')}
          );
    }
  };



}

