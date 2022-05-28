import {DateUtils} from "../utils/date.utils";

export class EventItem {
  originalEvent: any;
  start: Date;
  end: Date;

  public constructor(originalObject: any) {
    if(originalObject===null){
      this.originalEvent=null;
      this.start =new Date();
      this.end = new Date();
      return;
    }
    this.originalEvent = originalObject;
    this.start = DateUtils.fromUserDateToInternalDate(originalObject.startDate);
    this.end = DateUtils.fromUserDateToInternalDate(originalObject.endDate);
  }

}
