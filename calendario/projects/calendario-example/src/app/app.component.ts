import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calendario-example';

  myAddEvent = (item: any): void => {
    console.log('provided add function')
    console.log(item);
  }

  myDeleteEvent = (item: any, arg1: any): void => {
    console.log('provided delete function')
    console.log(item);
    console.log(arg1)
  }

  myUpdateEvent = (item: any): void => {
    console.log('provided update function')
    console.log(item);
  }
}
