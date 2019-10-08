import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { User } from './user' 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService],
})
export class AppComponent{

  invisibleInp = "hidden";
  invisibleBtn = "hidden";
  visibilityMainBtn = "block";
  visibilityMainBtnSnd1 = "none";
  visibilityMainBtnSnd2 = "none";
  visibilityMainBtnSnd3 = "none";
  Result = "";
  ResultRegister = "";

  changeBtn(){
    this.visibilityMainBtn = "none"
    this.visibilityMainBtnSnd1 = "block"
    this.visibilityMainBtnSnd3 = "block"
  }
  changeBtnInvers(){
    this.visibilityMainBtn = "block"
    this.visibilityMainBtnSnd1 = "none"
    this.visibilityMainBtnSnd3 = "none";
    this.visibilityMainBtnSnd2 = "none"
    this.Result = ""
    this.invisibleInp = "hidden"
  }
  changeInp(){
    this.visibilityMainBtnSnd2 = "block"
    this.visibilityMainBtnSnd1 = "none"
    this.visibilityMainBtnSnd3 = "block";
    this.Result = ""
  }

  user: User = new User(); // данные от пользователя
      
  receivedData: User; // полученные данные

  done: boolean = false;
  constructor(private httpService: HttpService){}
  search(user: User){
      this.httpService.postData(user)
              .subscribe(
                (data: User) => {this.receivedData=data; this.done=true, this.Result = this.receivedData.FullName, this.invisibleBtn = "hidden", this.invisibleInp= "visible"},
                error => {alert('Такого пользователя нет! Но вы можете создать!'), this.invisibleBtn = "visible", this.invisibleInp = "hidden"}
              );
  };
  register(user: User){
    this.httpService.postDataUser(user)
            .subscribe(
              (data: User) => {this.receivedData=data; this.done=true; this.ResultRegister = this.receivedData.FullNameRegister},
              error => {alert('Такой пользователь уже существует!')}
            );
  };

}
