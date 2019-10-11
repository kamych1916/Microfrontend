import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';

import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service'

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  connected2 = assetUrl('connected2.png')
  HelpIcon24 = assetUrl('Help_24.png')
  PasswordIcon = assetUrl('Password_24.png')
  SettingsIcon = assetUrl('Settings_24.png')
  SupportIcon = assetUrl('Support_24.png')
  HomeIcon = assetUrl('Home_32.png')
  ClientsIcon = assetUrl('Clients_32.png')
  HelpIcon16 = assetUrl('Help_16.png')
  CalcIcon64 = assetUrl('Calc_64.png')
  CalcIcon32 = assetUrl('Calc_32.png')
  ClientsIcon64 = assetUrl('Clients_64.png')
  AgentsRegistryIcon64 = assetUrl('Agents_Registry_64.png')
  BSOIcon64 = assetUrl('bso_64.png')
  VideoIcon64 = assetUrl('Video_64.png')
  PoliciesSupportIcon64 = assetUrl('PoliciesSupport_64.png')
  PaymentsIcon54 = assetUrl('Payments_64.png')
  QueriesIcon64 = assetUrl('Queries_64.png')
  PoliciesIcon64 = assetUrl('Policies_64.png')
  PoliciesIcon32 = assetUrl('Policies_32.png')
  LogoIcon = assetUrl('Logo.png')
  LogoCompanyIcon = assetUrl('Logo_Company.png')
  LogoCompany2Icon = assetUrl('Logo_Company2.png')
  PoliciesSupportIcon32 = assetUrl('PoliciesSupport_32.png')
  PaymentsIcon32 = assetUrl('Payments_32.png')
  AgentsRegistryIcon32 = assetUrl('Agents_Registry_32.png')
  bsoIcon32 = assetUrl('bso_32.png')
  TaskIcon32 = assetUrl('Task_32.png')

  linkHeader = 'http://localhost:3000/main/header'
  linkFooter = 'http://localhost:3000/main/footer'


  title = 'main';

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, public router: Router){
    // console.log(this.storage.get("token"))
    if(this.storage.get("token") == null) {
      this.router.navigate(['/auth'])
    }
    // }else{
    //   alert(this.storage.get("token"))
    //   console.log("kek")
    //   // this.storage.remove("token");
    // }
  }
  Exit(){
    this.storage.remove("token");
    this.router.navigate(['/auth'])
  }
}
