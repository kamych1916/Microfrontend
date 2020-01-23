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
  required: any
  search(contract: dataContracts ){
    if(contract.nameclient == undefined && contract.namecontract == undefined){
      this.required = 'данное поле является обязательным!'
    }else{
    this.httpService.postDataContract(contract)
            .subscribe(
              (data: dataContracts) => {this.receivedData=data; this.required = '', this.done=true, this.ResultNameContract = this.receivedData.namecontract, this.ResultNameClient = this.receivedData.nameclient, this.ResultNameCar = this.receivedData.namecar,this.ResultCostCar = this.receivedData.costcar, this.invisibleInp = "visible"},
              error => {alert('Договор не найден!'), this.required = 'данное поле является обязательным!'}
            );
    }
  };

  // ОТПРАВКА ДАННЫХ ПО ПАРАМЕТРУ В ССЫЛКЕ 
  ResultNameContract: any
  ResultNameClient: any
  ResultNameCar: any
  ResultCostCar: any
  postParamData(){
    console.log(this.ResultCostCar, this.ResultNameCar)
    this.router.navigate(['/auto/contract'], {queryParams: {ncontr: this.ResultNameContract, nclient: this.ResultNameClient, ncar: this.ResultNameCar, ccost: this.ResultCostCar}})
  }

}
