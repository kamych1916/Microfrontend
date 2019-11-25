import { Component, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service'
import {Links} from './links'


@Component({
  selector: 'autocontract-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{ 
  
  // ССЫЛКИ НА КАРТИНКИ/ВЕБКОПМОНЕНТЫ
  links = new Links
  
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private router: Router){
    if(this.storage.get("token") == null) {
      this.router.navigate(['/auth'])
    }
  }

}

