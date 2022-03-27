import {Component, Input, OnInit} from '@angular/core';
import {EventValidator} from "./shared/validators/event.validator";
import {EventItem} from "./shared/models/event.model";
import {CalendarUtils} from "./shared/utils/calendar.utils";


@Component({
  selector: 'cda-calendario',
  styleUrls: ['./calendar.style.css'],
  template: `
    <div>
      <div class="month">
        <ul>
          <li class="previous-month">&#10094;</li>
          <li class="next-month">&#10095;</li>
          <li>{{this.referenceDay.toLocaleDateString(undefined, {month: 'long'})}}<br><span style="font-size:18px">{{this.referenceDay.getFullYear()}}</span></li>
        </ul>
      </div>
      <ul class="weekdays">
        <li *ngFor="let day of this.days">{{day}}</li>
      </ul>
    </div>
  `,
  styles: [
  ]
})
export class CalendarioComponent implements OnInit {
   @Input() events: any;
   @Input() deleteEvent: any;
   @Input() deleteArguments: any;
   @Input() addEvent: any;
   @Input() addParameters: any;
   @Input() updateEvent: any;
   @Input() updateParameters: any;

   calendarDates: Array<Date> = [];
   days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   referenceDay = new Date();

  constructor() { }

  ngOnInit(): void {
    this.addParameters = this.initFunctionArguments(this.addParameters);
    this.deleteArguments = this.initFunctionArguments(this.deleteArguments);
    this.updateParameters = this.initFunctionArguments(this.updateParameters);
    this.events = this.transformReceivedEvents(this.events);
    this.calendarDates = CalendarUtils.getCalendarDays(this.referenceDay);
    console.log(this.calendarDates);
  }

  initFunctionArguments(originalArgument: any): any[] {
    if (originalArgument === undefined || originalArgument === null) {
      return  [];
    }
    return originalArgument;
  }

  transformReceivedEvents(eventsArray: any[]): EventItem[] {
    if(eventsArray === undefined || eventsArray === null) {
      return []
    }
    return eventsArray.filter((element: any) => EventValidator.validate(element))
      .map((element: any) => new EventItem(element))
  }

  setMonth(inc: number) {
    const [year, month] = [this.referenceDay.getFullYear(), this.referenceDay.getMonth()];
    this.referenceDay = new Date(year, month + inc, 1);
    this.calendarDates = CalendarUtils.getCalendarDays(this.referenceDay);
  }

}

// add/delete/update provided function has at least two params: item (an envent), callbackFunction
// callBack function (item, actionSuccess) (this only needs to be called from the user defined function
