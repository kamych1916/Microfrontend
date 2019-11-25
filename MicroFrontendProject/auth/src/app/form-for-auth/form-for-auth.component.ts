import { Component, Inject } from '@angular/core';
import { HttpService } from './http.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service'
import { User } from './user' 
import { Router } from '@angular/router';

@Component({
  selector: 'auth-form-for-auth',
  templateUrl: './form-for-auth.component.html',
  providers: [HttpService],
})
export class FormForAuthComponent {

  user: User = new User(); // данные от пользователя
      
  done: boolean = false;
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private httpService: HttpService, public router: Router){
    console.log(this.storage.get("token"))
  }

  receivedData: User; // полученные данные
  submit(user: User){
    this.httpService.postData(user)
      .subscribe(
        (data: User) => {this.receivedData=data; this.done=true; this.storage.set("token", this.receivedData.access_token), this.router.navigate(['/main'])},
        error => console.log(error)
      );
  };

}
