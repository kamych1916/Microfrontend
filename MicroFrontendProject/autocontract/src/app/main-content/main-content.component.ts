import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { dataContract } from './dataContract'
import { ActivatedRoute } from '@angular/router';
import { Links } from '../links';

@Component({
  selector: 'autocontract-main-content',
  templateUrl: './main-content.component.html',
  providers: [HttpService],
})
export class MainContentComponent implements OnInit {

  // ССЫЛКИ НА КАРТИНКИ/ВЕБКОПМОНЕНТЫ
  links = new Links

  constructor(private httpService: HttpService, private router: ActivatedRoute,) {}

  nameContractRider: any    
  countRoomsRider: any
  DataInputRiderChange(event){
    this.nameContractRider = event.detail.ChildNCR
    this.countRoomsRider = event.detail.ChildCR    
  }

  // ПРОВЕРКА ПАРАМЕТРОВ ССЫЛКИ ИЗ ВНЕ 
  sub: any  
  paramDataContr: any
  paramDataClient: any
  paramDataCar: any
  paramDataCCost: any
  ngOnInit() {
    this.sub = this.router
    .queryParams
    .subscribe(params => {
      console.log(params['ncontr'])
      this.paramDataContr = params['ncontr']
      console.log(params['nclient'])
      this.paramDataClient = params['nclient']
      console.log(params['ncar'])
      this.paramDataCar = params['ncar']
      console.log(params['ccost'])
      this.paramDataCCost = params['ccost']
    });
    // Неработает пока что! Пытался связать через события микро прил. и веб-комп. Если в параметрах имеется клиент, то поле веб-комп. должно изменится.
    // const event: CustomEvent<any> = new CustomEvent('connect-for-input-clientname-from-params', this.paramDataClient);
    // window.dispatchEvent(event);
    
    // СОБЫТИЕ ДЛЯ ПОИСКА ФИЗИЧЕСКОГО ЛИЦА
    const self = this;
    window.addEventListener('connect-for-search', (event) => {
      this.customEventListenerFunction(self, event)  
    }, true);
  }

  customEventListenerFunction(self, event) {
    self.nameClient = event.detail.scope.Result
  }
  visibilityMainBtn = "none"
    visibilityRiderBlock = "none"
    visibilityContractBlock = "block"
    showRiderChekBox = false
    showRiderButton(){
      if(this.showRiderChekBox == false){
        this.visibilityMainBtn = "inline-block"
        this.showRiderChekBox = true
      }else{
        this.visibilityMainBtn = "none" 
        this.showRiderChekBox = false
      }
    }
    IncludeRider = false
    showRider(){
      this.IncludeRider = true
      this.visibilityContractBlock = "none"
      this.visibilityRiderBlock = "block"
    }
    showContract(){
      alert(this.nameContractRider)
      this.visibilityContractBlock = "block"
      this.visibilityRiderBlock = "none"
    }


    contract: dataContract = new dataContract(); // данные от пользователя
    receivedData: dataContract; // полученные данные
    done: boolean = false;
    nameClient: any
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
