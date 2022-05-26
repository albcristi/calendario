import { NgModule } from '@angular/core';
import { CalendarioComponent } from './calendario.component';
import { CalendarItemComponent } from './views/calendar-item/calendar-item.component';
import {BrowserModule} from "@angular/platform-browser";
import { AddUpdateModalComponent } from './views/add-modal/add-update-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbDatepickerModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CalendarioComponent,
    CalendarItemComponent,
    AddUpdateModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CalendarioComponent
  ]
})
export class CalendarioModule { }
