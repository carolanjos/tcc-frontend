export default class CheckSchedulingEntity {
    id: number;
    specialty: string;
    doctor: string;
    date: string;
    start_time: string;
    status: string;

    constructor(
      id: number,
      specialty: string,
      doctor: string,
      date: string,
      start_time: string,
      status: string
    ) {
      this.id = id;
      this.specialty = specialty;
      this.doctor = doctor;
      this.date = date;
      this.start_time = start_time;
      this.status = status;
    }
}
