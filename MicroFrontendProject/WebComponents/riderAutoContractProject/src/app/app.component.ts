import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  
  namecontractrider: any;
  countrooms: any;

  sendData() {
    if(this.countrooms == undefined) alert('заполните пожалауйста поле "количество комнат"')
    if(this.namecontractrider == undefined ) alert('заполните пожалауйста поле "Номер Договора"')
    if(this.countrooms == "") alert('kek')
    if(this.namecontractrider == "") alert('lol')
  }
}
