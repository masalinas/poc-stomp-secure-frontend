import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ButtonModule } from 'primeng/button';

import { RxStompService } from './shared/websocket/rx-stomp.service';
import { RxStompServiceFactory } from './shared/websocket/rx-stomp-service-factory';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: RxStompService,
      useFactory: RxStompServiceFactory,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
