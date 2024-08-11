export default class DoctorCalendar {
  public startHour: string;
  public endHour: string;
  public startDate: string;
  public endDate: string;
  public weekDays: string[];
  public specialtyId: string;

  constructor() {
    this.startHour = '';
    this.endHour = '';
    this.startDate = '';
    this.endDate = '';
    this.weekDays = [];
    this.specialtyId = '';
  }
}
