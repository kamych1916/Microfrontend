
import { BrowserModule } from '@angular/platform-browser';
import {DoBootstrap, Injector, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {createCustomElement} from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}
  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, { injector: this.injector });
      if(customElements.get('footer-auth') == undefined || null){
        customElements.define('footer-auth', el)
      }else{}
  }
}
