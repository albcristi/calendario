import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calendario-example';

  constructor() {
  }

  myAddEvent = (item: any): void => {
    console.log('provided add function')
    console.log(item);
  }

  myDeleteEvent = (item: any, arg1: any): boolean => {
    console.log('provided delete function')
    console.log(item);
    console.log(arg1)
    return true;
  }

  myUpdateEvent = (item: any): void => {
    console.log('provided update function')
    console.log(item);
  }

  myGetEvents = (referenceMonth: Date): any => {
    let events = [];
    let referenceDay = new Date()
    referenceDay.setMonth(referenceMonth.getMonth());
    referenceDay.setDate(1);
    let noEvents = 8
    let eventTitles = ["Daily Meet.", "Call Mother", "Go to gym", "Do laundry", "Buy milk"]
    let descriptions = ["You didnt do this last week", "Find a better time next week!", "Remember to add note in work calendar", "Can do it later", "Maybe try and do it earlier"]
    while (noEvents > 0){
      let startTime = new Date(referenceDay);
      let endTime =new Date(referenceDay);
      endTime.setHours(referenceDay.getHours()+1);
      events.push( {startDate: startTime,endDate: endTime, title: eventTitles[noEvents>4 ? noEvents%4 : noEvents], description: descriptions[noEvents>4 ? noEvents%4 : noEvents], budget: parseInt(String(Math.random() * 10))});
      referenceDay = new Date(referenceDay);
      referenceDay.setDate(Math.random() * (25 - 1) + 1)
      noEvents--;
    }
    return events;
  }

  getEventItemFields = () => {
    return [
      {key: 'title', value: 'string'},
      {key: 'description', value: 'string'},
      {key: 'budget', value: 'number'}
    ]
  }
}
