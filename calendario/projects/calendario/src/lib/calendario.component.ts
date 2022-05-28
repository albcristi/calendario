import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EventValidator} from "./shared/validators/event.validator";
import {EventItem} from "./shared/models/event.model";
import {CalendarUtils} from "./shared/utils/calendar.utils";
import {AddUpdateModalComponent} from "./views/add-modal/add-update-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


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
        <ul class="weekdays-container">
          <li class="day-event-container-outside" *ngFor="let day of week">
            <div class="header-day">
              <div>
               {{day.toLocaleDateString(undefined, {day: 'numeric'})}}
              </div>
              <div>
                <cda-add-update-modal
                  [isAdd]="true"
                  [getEventItemFields]="getEventFields"
                  [dayOfEvent]="day"
                  [modalTitle]="'New Event'"
                  (retrieveCreatedData)="saveNewEventItem($event)">
                </cda-add-update-modal>
              </div>
            </div>
            <div class="day-events">
                  <div *ngFor="let eventOfCurrentDay of monthlyEvents.get(getDateAtHourZeroZero(day).getTime())">
                    <cda-calendar-item [eventItem]="eventOfCurrentDay"
                                       [getEventItemFields]="getEventFields"
                                       (removeEventItem)="removeEventFromMonthlyEvents($event)"
                                        (editEventItem)="updateEventItem($event)"></cda-calendar-item>
                  </div>
            </div>
          </li>
        </ul>
      </div>
      <ng-template #modalInfo let-modal>
        <div class="modal-header">
          <h4 class="modal-title" id="modal-basic-title">{{toastTitle}}</h4>
          <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click');"></button>
        </div>
        <div class="modal-body">
          <p>{{toastMessage}}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" (click)="modal.dismiss()">
            OK
          </button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
  ],
  entryComponents: [AddUpdateModalComponent]
})
export class CalendarioComponent implements OnInit {
   @Input() getEvents: any;
   @Input() getEventItemFields: any;
   @Input() deleteEvent: any;
   @Input() deleteArguments: any;
   @Input() addEvent: any;
   @Input() addParameters: any;
   @Input() updateEvent: any;
   @Input() updateParameters: any;

   @ViewChild('modalInfo') modalInfo: TemplateRef<any> | any;

   calendarDates: Array<Array<Date>> = [];
   days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   referenceDay = new Date();
   monthlyEvents: Map<number, Array<EventItem>> = new Map<number, Array<EventItem>>();
   showToast=false;
   toastTitle='';
   toastMessage='';

   constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
    this.addParameters = this.initFunctionArguments(this.addParameters);
    this.deleteArguments = this.initFunctionArguments(this.deleteArguments);
    this.updateParameters = this.initFunctionArguments(this.updateParameters);
    this.monthlyEvents = this.transformReceivedEvents(this.getEvents(this.referenceDay));
    let calendarDatesNotTransformed = CalendarUtils.getCalendarDays(this.referenceDay);
    this.calendarDates = this.groupDaysToWeeks(calendarDatesNotTransformed);
  }

  getDateAtHourZeroZero(day: Date): Date{
    day.setMinutes(0);
    day.setHours(0);
    day.setSeconds(0);
    day.setMilliseconds(0);
    return day;
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

  transformReceivedEvents(eventsArray: any[]) {
    if(eventsArray === undefined || eventsArray === null) {
      return new Map<number, Array<EventItem>>();
    }
    console.log(eventsArray)
    eventsArray =  eventsArray.filter((element: any) => EventValidator.validate(element))
      .map((element: any) => new EventItem(element))
    let mapOfEvents = new Map<number, Array<EventItem>>();
    console.log(eventsArray)
    eventsArray.forEach(eventItem => {
      let date =this.getDateAtHourZeroZero(new Date(eventItem.start));
      let timestamp = date.getTime()
      if(mapOfEvents.has(timestamp))
        { // @ts-ignore
          mapOfEvents.get(timestamp).push(eventItem)
        }
      else {
        mapOfEvents.set(timestamp, [eventItem])
      }
    })
    return mapOfEvents;
  }

  setMonth(inc: number) {
    const [year, month] = [this.referenceDay.getFullYear(), this.referenceDay.getMonth()];
    this.referenceDay = new Date(year, month + inc, 1);
    this.calendarDates = this.groupDaysToWeeks(CalendarUtils.getCalendarDays(this.referenceDay));
    this.monthlyEvents = this.transformReceivedEvents(this.getEvents(this.referenceDay));
  }

  removeEventFromMonthlyEvents(event: EventItem) {
    if(this.deleteEvent(event?.originalEvent.id, this.deleteArguments)){
      let day = new Date(event.start);
      day.setHours(0); day.setMinutes(0); day.setSeconds(0); day.setMilliseconds(0);
      let events = this.monthlyEvents.get(day.getTime());
      this.monthlyEvents.delete(day.getTime());
      // @ts-ignore
      this.monthlyEvents.set(day.getTime(),events.filter(e => e.originalEvent.id !== event.originalEvent.id));
      this.toastMessage = 'Deleted event: '+event.originalEvent.title;
      this.toastTitle = "Action status"
    }
    else {
      this.toastMessage = 'Failed to delete event: '+event.originalEvent.title;
      this.toastTitle = "Action status"
    }
    this.modalService.open(this.modalInfo);
  }

  getEventFields = () => {
    return this.getEventItemFields();
  }

  saveNewEventItem(eventJsonString: string) {
    let newEventObject = JSON.parse(eventJsonString);
    console.log("Recevied", newEventObject)
    if(this.addEvent(eventJsonString, this.addParameters)){
      console.log("ADD SUCCESS")
      this.toastMessage = 'Added event: '+newEventObject.title;
      this.toastTitle = "Action status"
    }
    else {
      console.log("ADD FAILED")
      this.toastMessage = 'Failed to add event: '+newEventObject.title;
      this.toastTitle = "Action status"
    }
    this.modalService.open(this.modalInfo);
  }

  updateEventItem(eventItemAsJsonString: string) {
    let edittedEventJson = JSON.parse(eventItemAsJsonString)
    console.log("RECEIVED EDIT", edittedEventJson);
    if(this.updateEvent(edittedEventJson, this.updateParameters)){
      this.toastMessage = 'Updated event: '+edittedEventJson.title;
      this.toastTitle = "Action status"
    }
    else {
      this.toastMessage = 'Failed to update event: '+edittedEventJson.title;
      this.toastTitle = "Action status"
    }
    this.modalService.open(this.modalInfo);
  }
}

// add/delete/update provided function has at least two params: item (an envent), callbackFunction
// callBack function (item, actionSuccess) (this only needs to be called from the user defined function
