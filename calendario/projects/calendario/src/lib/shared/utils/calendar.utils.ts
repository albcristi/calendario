const DAY_MS = 60 * 60 * 24 * 1000;

export class CalendarUtils {

  static getCalendarDays(date: Date) {
    // @ts-ignore
    const calendarStartTime =  CalendarUtils.getCalendarStartDay(date).getTime();

    return CalendarUtils.range(0, 41)
      .map(num => new Date(calendarStartTime + DAY_MS * num));
  }

  static getCalendarStartDay(date: Date) {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return CalendarUtils.range(1,7)
      .map(num => new Date(firstDayOfMonth - DAY_MS * num))
      .find(dt => dt.getDay() === 0)
  }

  static range(start: number, end: number, length = end - start + 1) {
    return Array.from({ length }, (_, i) => start + i)
  }
}
