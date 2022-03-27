import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {CalendarioModule} from "calendario";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        CalendarioModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
