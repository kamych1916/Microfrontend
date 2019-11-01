
import { enableProdMode, NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import singleSpaAngular from 'single-spa-angular';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps: any) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic().bootstrapModule(AppModule);
  },
  template: '<main-root />',
  Router,
  NgZone: NgZone,
});

export const bootstrap = lifecycles.bootstrap;

export const mount = 
// [
  lifecycles.mount;
//   () => Promise.all([
//     loadScript('http://localhost:3000/main/header'),
//   ]),
// ]

  // function loadScript(url) {
  //   return new Promise((resolve, reject) => {
      
  //     let MicroService = document.getElementById('single-spa-application:main').children;

  //     let webcomp = document.getElementById('webcomp');

  //     if(webcomp == null){

  //       let scriptEl = document.createElement('script');
  //       scriptEl.id = "webcomp"
  //       scriptEl.src = url;
  //       scriptEl.addEventListener('error', errEvt => {
  //         reject(errEvt.error)
  //       })
  //       scriptEl.addEventListener('load', () => {
  //         resolve()
  //       })
  //       MicroService[0].appendChild(scriptEl);
  //       // document.head.appendChild(scriptEl)
  //       // document.head.insertBefore(scriptEl, document.head.childNodes[16])

  //     }else{
        
  //       webcomp.addEventListener('error', errEvt =>{
  //         reject(errEvt.error);
  //       })
  //       resolve();

  //     }

  //   })
  // }
export const unmount = lifecycles.unmount;