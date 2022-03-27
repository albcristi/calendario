
export class DateUtils {

  static fromUserDateToInternalDate(originalValue: any): Date {
    return new Date(originalValue);
  }

  static sameDay(dateOne: Date, dateTwo: Date): boolean {
    return dateOne.getUTCFullYear() === dateTwo.getUTCFullYear() &&
      dateOne.getMonth() === dateTwo.getMonth() &&
      dateOne.getDay() === dateTwo.getDay();
  }

  public  static isValidDate(field: any): boolean {
    return !isNaN(new Date(field).getTime());
  }
}
