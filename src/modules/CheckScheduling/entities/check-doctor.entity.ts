export default class DoctorCheck {
    date: string;
    time: string;
    patient: string;
    specialty: string;
    status: string;
    attended: boolean;
  
    constructor(date: string, time: string, patient: string, specialty: string, status: string, attended: boolean) {
      this.date = date;
      this.time = time;
      this.patient = patient;
      this.specialty = specialty;
      this.status = status;
      this.attended = attended;
    }
  }
  