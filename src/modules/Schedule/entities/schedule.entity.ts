export default class Schedule {
    specialty_id: number;  // Referenciar o specialty pelo id
    date: string;
    start_time: string;
    end_time?: string;  // Tornar o end_time opcional
    doctor_id: number;  // Usar o id do médico para fazer a referência correta
    public busyDates: string[] = []

    constructor(specialty_id: number, date: string, start_time: string, doctor_id: number, end_time?: string, busyDates: string[] = []) {
        this.specialty_id = specialty_id;
        this.date = date;
        this.start_time = start_time;
        this.doctor_id = doctor_id;
        this.end_time = end_time;
        this.busyDates = busyDates;
    }
}
