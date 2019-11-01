import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  @Output() DataToMainForExit = new EventEmitter<any>()
  SendDataToMainForExit(event){
    this.DataToMainForExit.emit(event);
  }

}
