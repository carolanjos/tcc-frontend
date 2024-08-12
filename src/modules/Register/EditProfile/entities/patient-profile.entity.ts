export default class Patient {
    id!: number;
    name!: string;
    email!: string;
    date_birth!: string;
    document!: string;
    phone!: string;
    sex!: string;
    password!: string;
  
    constructor(
      id: number,
      name: string,
      email: string,
      date_birth: string,
      document: string,
      phone: string,
      sex: string,
      password: string
    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.date_birth = date_birth;
      this.document = document;
      this.phone = phone;
      this.sex = sex;
      this.password = password;
    }
  }
  