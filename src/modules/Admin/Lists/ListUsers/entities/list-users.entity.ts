export default class Users {
    public id: string;
    public name: string;
    public email: string;
    public phone: string;
    public document: string;
    public date_birth: string;

    constructor(
        id: string,
        name: string,
        email: string,
        phone: string,
        document: string,
        date_birth: string
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.document = document;
        this.date_birth = date_birth;
    }
}