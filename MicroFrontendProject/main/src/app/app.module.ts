import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LazyElementsModule } from '@angular-extensions/elements';

import { StorageServiceModule} from 'angular-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { PrimaryNavComponent } from './primary-nav/primary-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    PrimaryNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageServiceModule,
    LazyElementsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
