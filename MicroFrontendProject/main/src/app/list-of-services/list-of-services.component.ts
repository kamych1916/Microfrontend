import { Component} from '@angular/core';
import { Links } from '../links'

@Component({
  selector: 'main-list-of-services',
  templateUrl: './list-of-services.component.html'
})
export class ListOfServicesComponent{

  // ССЫЛКИ НА КАРТИНКИ/ВЕБКОПМОНЕНТЫ
  links = new Links

}
