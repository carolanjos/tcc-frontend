export default class UserPatient {
    public id: any[];
    public patient_name: string;
    public doctor_name: string;
    public start_time: string;
    public date: string; 
    public status: string;
    public specialty_name: string;
    public date_birth: string;

    constructor(
        id: any[] = [],
        patient_name: string,
        doctor_name: string,
        start_time: string,
        date: string,
        status: string,
        specialty_name: string,
        date_birth: string,
    ) {
        this.id = id;
        this.patient_name = patient_name;
        this.doctor_name = doctor_name;
        this.start_time = start_time;
        this.date = date;
        this.status = status;
        this.specialty_name = specialty_name;
        this.date_birth = date_birth;
    }
}