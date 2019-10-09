import { Component, Input, Inject, OnInit, OnDestroy, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { HttpService } from './http.service';
import { dataContract } from './dataContract' 

@Component({
  selector: 'autocontract-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService],
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'autocontract ttt';
  linkHeader = 'http://localhost:3004';
  linkFooter = 'http://localhost:3005';
  linkModal  = 'http://localhost:3006';
  LogoCompanyIcon = assetUrl('Logo_Company.png')
  LogoCompany2Icon = assetUrl('Logo_Company2.png')
  BackIcon32 = assetUrl('Back_32.png')
  PolicyIcon32 = assetUrl('Policy_32.png')
  PrintIcon32 = assetUrl('Print_32.png')
  
  nameClient: string;

  ngOnInit() {
    window.addEventListener('connect-for-search', this.customEventListenerFunction, true);
  }

  customEventListenerFunction(event) {
    console.log('text from enother Comp - ' , event.detail);
    this.nameClient = event.detail
  }

  ngOnDestroy(): void {
    window.removeEventListener('changeNameToCustomEvent', this.customEventListenerFunction, true);
  }

  contract: dataContract = new dataContract(); // данные от пользователя
      
  receivedData: dataContract; // полученные данные

  done: boolean = false;
  constructor(private httpService: HttpService){}
  save(contract: dataContract){
      this.httpService.postDataContract(contract)
              .subscribe(
                (data: dataContract) => {this.receivedData=data; this.done=true},
                error => {alert('че то лол какой то!')}
              );
  };
}

