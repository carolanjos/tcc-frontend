// src/entities/Register.ts

export default class Register {
    fullName: string;
    email: string;
    dob: string;
    cpf: string;
    phone: string;
    password: string;
  
    constructor(fullName: string, email: string, dob: string, cpf: string, phone: string, password: string) {
      this.fullName = fullName;
      this.email = email;
      this.dob = dob;
      this.cpf = cpf;
      this.phone = phone;
      this.password = password;
    }
  }
  