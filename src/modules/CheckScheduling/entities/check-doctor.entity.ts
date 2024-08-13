// src/modules/CheckScheduling/entities/check-doctor.entity.ts

export default class DoctorCheck {
  id: number;
  name: string;
  specialty: string;
  start_time: string;
  end_time: string;
  date: string;
  status: string
  attended: boolean;

  constructor(
    id: number,
    name: string,
    specialty: string,
    start_time: string,
    end_time: string,
    date: string,
    status: string,
    attended: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.specialty = specialty;
    this.start_time = start_time;
    this.end_time = end_time;
    this.date = date;
    this.status = status;
    this.attended = attended;
  }
}
