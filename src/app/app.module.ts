import {LayoutModule} from '@angular/cdk/layout';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {ObservableStore} from '@codewithdan/observable-store';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {ReduxDevToolsExtension} from '@codewithdan/observable-store-extensions';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NaviModule} from './navi/navi.module';
import {SharedModule} from './shared/shared.module';
import {NgxRxdbModule} from "@ngx-odm/rxdb";

ObservableStore.globalSettings = {
  trackStateHistory: true
};

ObservableStore.addExtension(
  new ReduxDevToolsExtension()
);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NaviModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule,
    FormlyMaterialModule,
    RouterModule,
    NgxRxdbModule.forRoot({options: {

      }})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
