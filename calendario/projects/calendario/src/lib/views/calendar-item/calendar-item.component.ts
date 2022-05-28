import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventItem} from "../../shared/models/event.model";

@Component({
  selector: 'cda-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css']
})
export class CalendarItemComponent implements OnInit {

  @Input() eventItem: EventItem | undefined;
  @Input() getEventItemFields: any;
  @Output() removeEventItem = new EventEmitter<EventItem>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.eventItem)
  }

  getTitleMinimized(title: String) {
    if(title === undefined || title === null)
      return "No Title";
    if(title.length > 14)
      return title.substr(0, 15);
    return title;
  }

  getTimeOfEventString(startDate: Date | undefined, endDate: Date | undefined): String{
    if(startDate === undefined || endDate === undefined)
      return "Unknown hours"
    return `From ${startDate.getHours()}:${startDate.getMinutes()} to ${endDate.getHours()}:${endDate.getMinutes()} `
  }

  handleRemove() {
    this.removeEventItem.emit(this.eventItem);
  }

  handleEventEdit(eventAsJsonString: string) {
    console.log(eventAsJsonString);
  }

  getDayOfTheEvent(): Date {
    if(this.eventItem === undefined || this.eventItem.start === undefined)
      return new Date()
    return this.eventItem.start;
  }
}
