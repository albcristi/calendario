import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cda-calendario',
  template: `
    <p>
      calendario works!
    </p>
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
    console.log(this.events);
    this.deleteEvent({d: new Date()}, ...this.deleteArguments);
    console.log(this.deleteArguments);
    this.addEvent({d: new Date()});
    console.log(this.addParameters);
    this.updateEvent({d: new Date()});
    console.log(this.updateParameters);
  }

  initFunctionArguments(originalArgument: any): any[] {
    if (originalArgument === undefined || originalArgument === null) {
      return  [];
    }
    return originalArgument;
  }

}
