import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventItem} from "../../shared/models/event.model";

@Component({
  selector: 'cda-my-calendar-event',
  templateUrl: './my-calendar-event.component.html',
  styleUrls: ['./my-calendar-event.component.css']
})
export class MyCalendarEventComponent implements OnInit {
  @Input() event: EventItem | undefined;
  @Input() getEventFields: any[] | undefined;
  eventFields: any[] = [];

  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
    // @ts-ignore
    this.eventFields = this.getEventFields().filter((field: {key: string})=> field.key !== 'title');
  }

  openModal(modal: any) {
    this.modalService.open(modal);
  }

  getFieldValue(field: any | undefined): string {
    if(field === undefined || this.event === undefined || this.event.originalEvent === undefined || this.event.originalEvent[field] === undefined)
      return '---'
    field = String(field);
    return String(this.event.originalEvent[field])
  }

  getTimeOfDate(date: Date | undefined): string {
    if(date === undefined)
      return '---'
    return `${date.getHours()}:${date.getMinutes()}`
  }

  getTitle(eventFieldElement: string | undefined) : string{
    if(eventFieldElement === undefined)
      return ''
    return eventFieldElement.charAt(0).toUpperCase() + eventFieldElement.substr(1, eventFieldElement.length-1);
  }
}
