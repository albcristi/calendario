# [fd-calendario](https://www.npmjs.com/package/fd-calendario) - Angular calendar component

![fd-calendario](images/calendario.PNG)

FD-CALENDARIO is an Angular calendar library that will make displayig events on your calendar easier than ever. We have it all, all you have to do is install the library from npm, provide the your logic for the CRUD operations and we will take care of displaying your events.

# Installing fd-calendario

In order to install fd-calendario please run the following: `npm i fd-calendario`

### Important notice:
In order to use this component, it is important to have all the required dependencies and also to use the ng-boostrap angular library. Make sure you do this steps correctly, in order for you to 
have a more pleasant set up and getting to understand how to use our component we provide you with an Angular example application, you can find it by clicking
on this example [calendario-example](calendario/projects/calendario-example). Please follow the following sections for more help. 


# Getting started

## Modeling your event            

How to model the class of the object you want to model for assuring a correct use of our library. In this respect, make sure your class contains the following fields:
 * startDate: Date or number (representing timestamp)
 * endDate: Date or number (representing timestamp)
 * title: string
 * id: number (UNIQUE VALUE)

Example of the minimum required fields for such a class:
```typescript
export class EventItem {
    id: number;
    startDate: Date | number;
    endDate: Date | number;
    title: string;
    // rest of the code...
}
```

## Handling CRUD operations

### Using the component
In order to use our component you'll have to do the following:   
```html
<div style="width: 88vw">
    <cda-calendario [getEvents]="this.myGetEvents"
                    [getEventItemFields]="this.getEventItemFields"
                    [addEvent]="this.myAddEvent"
                    [addParameters]="[1]"
                    [updateEvent]="this.myUpdateEvent"
                    [updateParameters]="[1]"
                    [deleteEvent]="this.myDeleteEvent"
                    [deleteArguments]="[1]"></cda-calendario>
</div>
```

Make sure to adjust the width and height according to your needs, regarding what you have to provide to
the component, you'll be offered some guidance in the following sections, and you can always get help from the
provided Angular example.

### Getting your events or `[getEvents]="this.myGetEvents"`

Our library requires a function that will retrieve all the objects for a given month.
In the example, we provide such a function that randomly generates some events that will be further
be used to fill in some spots on our calendar. Usually here you'd have a call to the backend rest api .Please find the example bellow:
```typescript
myGetEvents = (referenceMonth: Date): any => {
    let events = [];
    let referenceDay = new Date()
    referenceDay.setMonth(referenceMonth.getMonth());
    referenceDay.setDate(1);
    let id = 1;
    let noEvents = 8
    let eventTitles = ["Daily Meet.", "Call Mother", "Go to gym", "Do laundry", "Buy milk"]
    let descriptions = ["You didnt do this last week", "Find a better time next week!", "Remember to add note in work calendar", "Can do it later", "Maybe try and do it earlier"]
    while (noEvents > 0){
      let startTime = new Date(referenceDay);
      let endTime =new Date(referenceDay);
      endTime.setHours(referenceDay.getHours()+1);
      events.push( {id: id, startDate: startTime,endDate: endTime, title: eventTitles[noEvents>4 ? noEvents%4 : noEvents], description: descriptions[noEvents>4 ? noEvents%4 : noEvents], budget: parseInt(String(Math.random() * 10))});
      referenceDay = new Date(referenceDay);
      referenceDay.setDate(Math.random() * (25 - 1) + 1)
      id++;
      noEvents--;
    }
    return events;
  }
```

### Letting us know the structure of your class or `[getEventItemFields]="this.getEventItemFields"`

We use this in order to know what fields your class has (except startDate and endDate). You need to provide us with the field name and the type. We support strings and numbers for now. An example is given bellow:
```typescript
  getEventItemFields = () => {
    return [
      {key: 'title', value: 'string'},
      {key: 'description', value: 'string'},
      {key: 'budget', value: 'number'}
    ]
  }
```

### Creating an event or `[addEvent]="this.myAddEvent"`   

You need to pass a function that by default has at least one parameter and handles the add of a new event for your part of the application (we only display it!).
This function returns the newly created event (or null in case of error), stating the status of the operation and in case you need to pass some more parameters, you are required to use `[addParameters]="[1]"`. Our simple example
for the add operation:
```typescript
myAddEvent = (item: any, args: any): any => {
    console.log('provided add function')
    console.log(item);
    return item;
  }
```

### Deleting an event or `[deleteEvent]="this.myDeleteEvent"`

The logic is similar to the one used for the add event. As a first parameter we need the event that will be deleted, and in case you need some other parameters
you pass them using a list of objects (just like in the case of add and update), this is done using `[deleteArguments]="[1]"`. As a return value, a boolean stating
the success of the operation is passed. Please see the following template:

```typescript
myDeleteEvent = (item: any, arg1: any): boolean => {
    console.log('provided delete function')
    console.log(item);
    console.log(arg1)
    return Math.random() > 0.5 // simulate possibility of error
  }
```

### Update an event or ` [updateEvent]="this.myUpdateEvent"`

Same logic as the one from add function is applied here. For additional arguments we use ` [updateParameters]="[1]"`. Code sample bellow:
```typescript
myUpdateEvent = (item: any, args: any): any => {
    console.log('provided update function')
    console.log(item);
    return item;
  }
```