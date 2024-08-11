export class LoginData {
    email: string;
    password: string;
  
    constructor(email: string, password: string) {
      this.email = email;
      this.password = password;
    }
  }
  
  export class TokenData {
    access: string;
    role: string;
  
    constructor(access: string, role: string) {
      this.access = access;
      this.role = role;
    }
  }
  