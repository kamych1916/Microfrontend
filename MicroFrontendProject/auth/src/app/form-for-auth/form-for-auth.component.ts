import { Component, Inject } from '@angular/core';
import { HttpService } from './http.service';
import { SESSION_STORAGE, WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service'
import { User } from './user' 
import { Router } from '@angular/router';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'auth-form-for-auth',
  templateUrl: './form-for-auth.component.html',
  providers: [HttpService],
})
export class FormForAuthComponent {

  user: User = new User(); // данные от пользователя
      
  done: boolean = false;
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, @Inject(LOCAL_STORAGE) private local_storage: WebStorageService, private httpService: HttpService, public router: Router){
  console.log(this.storage.get("token"))
  }

  receivedData: User; // полученные данные
  submit(user: User){
    this.httpService.postData(user)
      .subscribe(
        (data: User) => {this.receivedData=data; this.done=true; this.storage.set("token", this.receivedData.access_token), this.local_storage.set("login", this.user.Login); this.router.navigate(['/main'])},
          function (error){ if(error.status == 401){ alert('неверный логин или пароль')}else{ alert('ошибка на стороне сервера')}}
      );
  };

}
