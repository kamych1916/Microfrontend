import { Component, Inject } from '@angular/core';
import { Links } from './links';

import { Router } from '@angular/router';

import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service'

@Component({
  selector: 'contracts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent{

  // ССЫЛКИ НА КАРТИНКИ/ВЕБКОПМОНЕНТЫ
  links = new Links

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, public router: Router){
    if(this.storage.get("token") == null) {
      this.router.navigate(['/auth'])
    }
  }

}
