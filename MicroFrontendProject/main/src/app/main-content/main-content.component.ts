import { Component } from '@angular/core';
import { Links } from '../links'

@Component({
  selector: 'main-main-content',
  templateUrl: './main-content.component.html'
})
export class MainContentComponent {

  // ССЫЛКИ НА КАРТИНКИ/ВЕБКОПМОНЕНТЫ
  links = new Links

}
