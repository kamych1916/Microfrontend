import { Component, Inject } from '@angular/core';
import {Links} from './links' 
@Component({
  selector: 'auth-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  // ССЫЛКИ НА КАРТИНКИ/ВЕБКОПМОНЕНТЫ
  links = new Links

}

