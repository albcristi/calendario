import { NgModule } from '@angular/core';
import { CalendarioComponent } from './calendario.component';
import { CalendarItemComponent } from './views/calendar-item/calendar-item.component';
import {BrowserModule} from "@angular/platform-browser";



@NgModule({
  declarations: [
    CalendarioComponent,
    CalendarItemComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    CalendarioComponent
  ]
})
export class CalendarioModule { }
