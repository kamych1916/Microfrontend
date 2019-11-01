import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { HttpService} from './http.service';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service'
import { User } from './user' 
import { Router } from '@angular/router';
import { singleSpaPropsSubject, SingleSpaProps } from 'src/single-spa/single-spa-props';
import { Subscription } from 'rxjs';

@Component({
  selector: 'auth-root',
  templateUrl: './app.component.html',
  providers: [HttpService],
  styleUrls: ['./app.component.css'],
})
export class AppComponent{

  linkFooter = 'http://localhost:3000/auth/footer'
  linkHeader = 'http://localhost:3000/auth/header'

  user: User = new User(); // данные от пользователя
      
  receivedData: User; // полученные данные
  
  done: boolean = false;
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private httpService: HttpService, public router: Router){
    console.log(this.storage.get("token"))
  }
  submit(user: User){
      this.httpService.postData(user)
              .subscribe(
                (data: User) => {this.receivedData=data; this.done=true; this.storage.set("token", this.receivedData.access_token), this.router.navigate(['/main'])},
                // error => {if(error.status != '401'){this.router.navigate(['/main'])}else{alert('неверный логин или пароль!')}},
                error => alert('логин либо пароль неверны')
              );
  };
  // singleSpaProps: SingleSpaProps = null;
  // subscription: Subscription = null;
  // ngOnInit() {
  //   this.subscription = singleSpaPropsSubject.subscribe(
  //     props => this.singleSpaProps = props
  //   )
  //   console.log("kek: ", this.singleSpaProps)
  // }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe()
  // }
}

