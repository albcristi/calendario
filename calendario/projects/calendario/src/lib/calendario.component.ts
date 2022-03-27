import {Component, Input, OnInit} from '@angular/core';
import {EventValidator} from "./shared/validators/event.validator";
import {elementAt} from "rxjs";
import {EventItem} from "./shared/models/event.model";

@Component({
  selector: 'cda-calendario',
  template: `
    <div>

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

  constructor() { }

  ngOnInit(): void {
    this.addParameters = this.initFunctionArguments(this.addParameters);
    this.deleteArguments = this.initFunctionArguments(this.deleteArguments);
    this.updateParameters = this.initFunctionArguments(this.updateParameters);
    this.events = this.transformReceivedEvents(this.events);
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

}
