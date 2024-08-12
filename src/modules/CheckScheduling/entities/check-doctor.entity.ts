// src/modules/CheckScheduling/entities/check-doctor.entity.ts

export default class DoctorCheck {
  id: number;
  date: string;
  time: string;
  patient: string;
  specialty: string;
  status: string;
  attended: boolean;

  constructor(
    id: number,
    date: string,
    time: string,
    patient: string,
    specialty: string,
    status: string,
    attended: boolean
  ) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.patient = patient;
    this.specialty = specialty;
    this.status = status;
    this.attended = attended;
  }
}
