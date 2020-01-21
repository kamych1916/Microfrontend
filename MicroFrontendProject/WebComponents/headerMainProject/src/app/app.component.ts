import { Component, Input } from '@angular/core';
import { SessionStorageService } from './sessionstorageservice'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{

  NameOfUser: any

  constructor(private sessionStorageService: SessionStorageService ) {
    this.NameOfUser = this.sessionStorageService.local_storage.get('login')
  }
  
  @Input() ImagesInContainerHeaderWC: any

  SubmitForExit(){
      this.sessionStorageService.storage.remove('token');
      window.location.replace("http://localhost:4200/auth");
  }

}
