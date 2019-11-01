
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
  bootstrapFunction: singleSpaProps => {
    // console.log(singleSpaProps);
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic().bootstrapModule(AppModule);
  },
  template: '<autocontract-root />',
  Router,
  NgZone: NgZone,
});

export const bootstrap = [
  () => Promise.all([
    loadScript('http://localhost:3000/autocontract/header'),
  ]),
  lifecycles.bootstrap
]

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const scriptEl = document.createElement('script');
    scriptEl.src = url;
    scriptEl.addEventListener('error', errEvt => {
      reject(errEvt.error)
    })
    scriptEl.addEventListener('load', () => {
      resolve()
    })
    document.head.appendChild(scriptEl);
    scriptEl.remove()
  })
}
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;