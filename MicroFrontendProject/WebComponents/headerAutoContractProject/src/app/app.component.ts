import { Component, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  @Output() DataToAutoContractExit = new EventEmitter<any>()

  SendDataToAutoContractForExit(event: boolean){
    this.DataToAutoContractExit.emit(event);
  }

}
