import { Component, Input, Inject, OnInit, AfterContentInit,  OnDestroy, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
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
  BackIcon32 = assetUrl('Back_32.png')
  PolicyIcon32 = assetUrl('Policy_32.png')
  PrintIcon32 = assetUrl('Print_32.png')
  
  nameClient: any
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
    window.addEventListener('connect-for-search', this.customEventListenerFunction, true);
  }
  
  customEventListenerFunction(event) {
    this.nameClient = event.detail
  }
  
  ngOnDestroy(): void {
    window.location.reload();
    window.removeEventListener('changeNameToCustomEvent', this.customEventListenerFunction, true);
  }
  
  contract: dataContract = new dataContract(); // данные от пользователя
  
  receivedData: dataContract; // полученные данные

  done: boolean = false;

  save(contract: dataContract, ){
    // contract.nameclient = this.nameClient
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
}

