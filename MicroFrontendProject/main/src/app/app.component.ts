import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Links } from './links'

import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service'

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html'
})
export class AppComponent  {


  // ССЫЛКИ НА КАРТИНКИ/ВЕБКОПМОНЕНТЫ
  links = new Links

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, public router: Router){
    if(this.storage.get("token") == null) {
      this.router.navigate(['/auth'])
    }
  }
  
}
