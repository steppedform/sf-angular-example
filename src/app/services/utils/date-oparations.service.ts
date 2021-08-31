import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateOparationsService {

  constructor() { }

  dateFormatted(date: Date) {
    return (date.getMonth() + 1) + '/' +  date.getDate() + '/' +  date.getFullYear();
  }

  dateTomorrow(date: Date) {
    const tomorrow = new Date(date);
    return new Date(tomorrow.setDate(tomorrow.getDate() + 1));
  }

  fullDate(date: Date) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayOrder = date.getDay();
    const dayOfDate = date.getDate();
    const monthOrder = date.getMonth();
    const year = date.getFullYear();

    const day = daysOfWeek[dayOrder];
    const month = monthsOfYear[monthOrder];

    //Example: Tuesday (Apr 27, 2021)
    const fullDate = day + ' (' + month + ' ' + dayOfDate + ', ' + year + ')';

    return fullDate;
  }

  deliveryDates() {
    const today = new Date();
    const tomorrow = this.dateTomorrow(today);
    const afterTomorrow = this.dateTomorrow(tomorrow);

    const todayFormatted = this.dateFormatted(today);
    const tomorrowFormatted = this.dateFormatted(tomorrow);
    const afterTomorrowFormatted = this.dateFormatted(afterTomorrow);

    const todayFullDate = this.fullDate(today);
    const tomorrowFullDate = this.fullDate(tomorrow);
    const afterTomorrowFullDate = this.fullDate(afterTomorrow);
    
    return { todayFormatted, tomorrowFormatted, afterTomorrowFormatted, todayFullDate, tomorrowFullDate, afterTomorrowFullDate }
  }
}
