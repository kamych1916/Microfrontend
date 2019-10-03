import { Component } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';

import * as $ from "jquery";
@Component({
  selector: 'autocontract-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'autocontract ttt';
  linkHeader = 'http://localhost:3004';
  linkFooter = 'http://localhost:3005';

  LogoCompanyIcon = assetUrl('Logo_Company.png')
  LogoCompany2Icon = assetUrl('Logo_Company2.png')
  BackIcon32 = assetUrl('Back_32.png')
  PolicyIcon32 = assetUrl('Policy_32.png')
  PrintIcon32 = assetUrl('Print_32.png')

  OpenModal(){
    $('#myModal').modal('show');
  }
}
