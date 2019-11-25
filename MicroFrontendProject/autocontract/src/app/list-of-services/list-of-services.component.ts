import { Component } from '@angular/core';
import { Links } from '../links'

@Component({
  selector: 'autocontract-list-of-services',
  templateUrl: './list-of-services.component.html'
})
export class ListOfServicesComponent {

  links = new Links

}
