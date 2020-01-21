import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
// import { ElModule } from 'element-angular'
// import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LazyElementsModule } from '@angular-extensions/elements';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { StorageServiceModule } from 'angular-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { ListOfServicesComponent } from './list-of-services/list-of-services.component';
import { MainContentComponent } from './main-content/main-content.component';

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    ListOfServicesComponent,
    MainContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    // ElModule.forRoot(),
    // LoadingBarModule.forRoot(),
    FormsModule,
    StorageServiceModule,
    LazyElementsModule,
    NgZorroAntdModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
