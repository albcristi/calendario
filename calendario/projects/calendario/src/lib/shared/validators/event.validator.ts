import {BaseValidator} from "./base.validator";
import {DateUtils} from "../utils/date.utils";

export class EventValidator implements BaseValidator{

  /*
  This will check whether an item has two date/number fields:
   - startDate
   - endDate
   Needed in order to be able to place the event in
   the calendar
   */
  public static validate(item: any): boolean {
    if(!item.hasOwnProperty('startDate') || !item.hasOwnProperty('endDate'))
      return false;
    if(!(item.startDate instanceof Date) && !(typeof item.startDate === 'number')) {
      return false;
    }
    if(!(item.endDate instanceof Date) && !(typeof item.endDate === 'number')) {
      return false;
    }
    if(!DateUtils.isValidDate(item.startDate)) {
      return false;
    }
    if (!DateUtils.isValidDate(item.endDate)) {
      return false;
    }
    return DateUtils.sameDay(new Date(item.startDate), new Date(item.endDate));
  }

}
