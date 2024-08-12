export default class UserProfile {
  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public sex: string;
  public date_birth: string;
  public document: string;
  public crm: string;
  public specialties: number[];

  constructor() {
    this.id = 0; // ou null dependendo de como seu sistema lida com IDs
    this.name = '';
    this.email = '';
    this.phone = '';
    this.sex = '';
    this.date_birth = '';
    this.document = '';
    this.crm = '';
    this.specialties = [];
  }
}
