
import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import {createCustomElement} from '@angular/elements';
import { HttpClientModule } from '@angular/common/http'; 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    NzCardModule,
    NzInputModule,
    NgZorroAntdModule,
    NzButtonModule,
    NzModalModule,
    NzGridModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  // bootstrap: [AppComponent],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}
  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, { injector: this.injector });
      if(customElements.get('modal-webcomp') == undefined || null){
        customElements.define('modal-webcomp', el)
      }else{}
  }
}
