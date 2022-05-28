import { NgModule } from '@angular/core';
import { CalendarioComponent } from './calendario.component';
import { CalendarItemComponent } from './views/calendar-item/calendar-item.component';
import {BrowserModule} from "@angular/platform-browser";
import { AddUpdateModalComponent } from './views/add-modal/add-update-modal.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { MyCalendarEventComponent } from './views/my-calendar-event/my-calendar-event.component';

@NgModule({
  declarations: [
    CalendarioComponent,
    CalendarItemComponent,
    AddUpdateModalComponent,
    MyCalendarEventComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  exports: [
    CalendarioComponent
  ]
})
export class CalendarioModule { }
