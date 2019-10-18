import { Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{

  nameContractRider: any
  countRoomsRider: any
  @Output() DataInputRiderChange = new EventEmitter<any>()


  onDataInputRiderChange(){
    this.DataInputRiderChange.emit({ ChildNCR: this.nameContractRider, ChildCR: this.countRoomsRider });
  }


}

// this.InputLineChanged.emit({ ChildNCR: this.namecontractrider, ChildCR: this.countrooms });