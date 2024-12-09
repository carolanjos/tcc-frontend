export default class CalendarEntity {
    id?: number;
    start_hour;
    end_hour: string;
    start_date: string;
    end_date: string;
    week_day: string[];
    doctor?: number;
  
    constructor(
      start_hour: string,
      end_hour: string,
      start_date: string,
      end_date: string,
      week_day: string[],
      doctor?: number
    ) {
      this.start_hour = start_hour;
      this.end_hour = end_hour;
      this.start_date = start_date;
      this.end_date = end_date;
      this.week_day = week_day;
      this.doctor = doctor;
    }
}
  