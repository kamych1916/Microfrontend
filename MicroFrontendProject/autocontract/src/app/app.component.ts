import { Component, Inject } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { HttpService } from './http.service';
import { User } from './user' 

@Component({
  selector: 'autocontract-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService],
})
export class AppComponent {
  title = 'autocontract ttt';
  linkHeader = 'http://localhost:3004';
  linkFooter = 'http://localhost:3005';
  invisibleInp = "hidden";
  invisibleBtn = "hidden";
  Result = "";
  LogoCompanyIcon = assetUrl('Logo_Company.png')
  LogoCompany2Icon = assetUrl('Logo_Company2.png')
  BackIcon32 = assetUrl('Back_32.png')
  PolicyIcon32 = assetUrl('Policy_32.png')
  PrintIcon32 = assetUrl('Print_32.png')
  
  user: User = new User(); // данные от пользователя
      
  receivedData: User; // полученные данные

  done: boolean = false;
  constructor(private httpService: HttpService){}
  submit(user: User){
      this.httpService.postData(user)
              .subscribe(
                (data: User) => {this.receivedData=data; this.done=true, this.Result = this.receivedData.FullName, this.invisibleBtn = "hidden", this.invisibleInp= "visible"},
                error => {alert('Такого пользователя нет! Но вы можете создать!'), this.invisibleBtn = "visible", this.invisibleInp = "hidden"}
              );
      
  };
}

