export default class Doctor {
    public name: string;
    public email: string;
    public birthdate: string;
    public document: string;
    public sex: string;
    public phone: string;
    public password: string;
    public crm: string;
    public specialties: number[];

    constructor() {
        this.name = '';
        this.email = '';
        this.birthdate = '';
        this.document = '';
        this.sex = '';
        this.phone = '';
        this.password = '';
        this.crm = '';
        this.specialties = [];
    }
}