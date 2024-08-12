export default class Doctor {
    id!: number;
    name!: string;
    email!: string;
    birthdate!: string;
    document!: string;
    sex!: string;
    phone!: string;
    password!: string;
    crm!: string;
    specialties!: number[];
  
    constructor(
      id: number,
      name: string,
      email: string,
      birthdate: string,
      document: string,
      sex: string,
      phone: string,
      password: string,
      crm: string,
      specialties: number[]
    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.birthdate = birthdate;
      this.document = document;
      this.sex = sex;
      this.phone = phone;
      this.password = password;
      this.crm = crm;
      this.specialties = specialties;
    }
  }
  