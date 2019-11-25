import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { dataContracts } from './dataContracts';
import { Router } from '@angular/router';
import { Links } from '../links'
@Component({
  selector: 'contracts-main-content',
  templateUrl: './main-content.component.html',
  providers: [HttpService],
})
export class MainContentComponent {

  links = new Links

  contract: dataContracts = new dataContracts(); // данные от пользователя
  done: boolean = false;
  constructor(private httpService: HttpService, public router: Router) { }

  receivedData: dataContracts; // полученные данные
  invisibleInp = "hidden"
  search(contract: dataContracts ){
    this.httpService.postDataContract(contract)
            .subscribe(
              (data: dataContracts) => {this.receivedData=data; this.done=true, this.ResultNameContract = this.receivedData.namecontract, this.ResultNameClient = this.receivedData.nameclient, this.invisibleInp = "visible"},
              error => {alert('Договор не найден!')}
            );
  };

  // ОТПРАВКА ДАННЫХ ПО ПАРАМЕТРУ В ССЫЛКЕ 
  ResultNameContract: any
  ResultNameClient: any
  postParamData(){
    this.router.navigate(['/auto/contract'], {queryParams: {ncontr: this.ResultNameContract, nclient: this.ResultNameClient}})
  }

}
