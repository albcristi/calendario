import {DateUtils} from "../utils/date.utils";

export class EventModel {
  originalEvent: any;
  start: Date;
  end: Date;

  public constructor(originalObject: any) {
    this.originalEvent = originalObject;
    this.start = DateUtils.fromUserDateToInternalDate(originalObject.startDate);
    this.end = DateUtils.fromUserDateToInternalDate(originalObject.endDate);
  }

}
