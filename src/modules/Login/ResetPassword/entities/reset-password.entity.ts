export default class ResetPasswordRequest {
    password: string;
    password2: string;

    constructor() {
        this.password = '';
        this.password2 = '';
    }
}
