import { Component, Output, EventEmitter, } from '@angular/core';
import { SessionStorageService } from './sessionstorageservice'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{

  // @Output() DataToAutoContractExit = new EventEmitter<any>()

  // SendDataToAutoContractForExit(event: boolean){
  //   this.DataToAutoContractExit.emit(event);
  // }

  constructor(private sessionStorageService: SessionStorageService ) { }

  SubmitForExit(){
      this.sessionStorageService.storage.remove('token');
      window.location.replace("http://localhost:4200/auth");
  }
  

}
