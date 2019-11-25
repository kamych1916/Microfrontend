
import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {createCustomElement} from '@angular/elements';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { SessionStorageService } from './sessionstorageservice' 


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    StorageServiceModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [SessionStorageService],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule implements DoBootstrap {
  
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, { injector: this.injector });
      if(customElements.get('header-contracts') == undefined || null){
        customElements.define('header-contracts', el)
      }else{}
  }
}
