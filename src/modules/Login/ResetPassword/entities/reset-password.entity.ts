export default class ResetPasswordRequest {
    password: string;
    password2: string;
    token: string;
    uid: string;

    constructor() {
        this.password = '';
        this.password2 = '';
        this.token = '';
        this.uid = '';
    }
}
