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
          <li class="previous-month" (click)="this.setMonth(-1)">&#10094;</li>
          <li class="next-month" (click)="this.setMonth(1)">&#10095;</li>
          <li>{{this.referenceDay.toLocaleDateString(undefined, {month: 'long'})}}<br><span style="font-size:18px">{{this.referenceDay.getFullYear()}}</span></li>
        </ul>
      </div>
      <ul class="weekdays">
        <li *ngFor="let day of this.days">{{day}}</li>
      </ul>
      <div class="week" *ngFor="let week of this.calendarDates">
        <li *ngFor="let day of week">
          <div class="header-day">
            <div>
              {{day.toLocaleDateString(undefined, {day: 'numeric'})}}
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
            </div>
          </div>
          <div class="day-events">
            <div class="day-event">
              day
            </div>
            <div class="day-event">
              day
            </div>
          </div>
        </li>
      </div>
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

   calendarDates: Array<Array<Date>> = [];
   days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   referenceDay = new Date();
  constructor() { }

  ngOnInit(): void {
    this.addParameters = this.initFunctionArguments(this.addParameters);
    this.deleteArguments = this.initFunctionArguments(this.deleteArguments);
    this.updateParameters = this.initFunctionArguments(this.updateParameters);
    this.events = this.transformReceivedEvents(this.events);
    let calendarDatesNotTransformed = CalendarUtils.getCalendarDays(this.referenceDay);
    this.calendarDates = this.groupDaysToWeeks(calendarDatesNotTransformed);
  }

  groupDaysToWeeks(calendarDatesNotTransformed: Array<Date>){
    let numberWeeks = calendarDatesNotTransformed.length / 7;
    let index = 0;
    let result = []
    while (index < numberWeeks){
      let slice = this.getSliceFromArray(calendarDatesNotTransformed, index);
      if(index === 0 && slice[slice.length-1].toLocaleDateString(undefined, {month: 'long'}) == this.referenceDay.toLocaleDateString(undefined, {month: 'long'}))
        result.push(slice)
      else if (index + 1 === numberWeeks && slice[0].toLocaleDateString(undefined, {month: 'long'}) ===  this.referenceDay.toLocaleDateString(undefined, {month: 'long'}))
        result.push(slice);
      else if ( index > 0 && index+1 < numberWeeks)
        result.push(slice)
      index++;
    }

    return result;
  }

  getSliceFromArray(arr: Array<Date>, slice: number) {
    return  arr.slice(slice*7, (slice+1)*7)
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
    this.calendarDates = this.groupDaysToWeeks(CalendarUtils.getCalendarDays(this.referenceDay));
  }

}

// add/delete/update provided function has at least two params: item (an envent), callbackFunction
// callBack function (item, actionSuccess) (this only needs to be called from the user defined function
