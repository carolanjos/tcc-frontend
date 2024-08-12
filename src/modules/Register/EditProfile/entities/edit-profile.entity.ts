// src/modules/UserProfile/entities/user-profile.entity.ts

export default class UserProfile {
  id!: number;
  name!: string;
  email!: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
