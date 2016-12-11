/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */
export class Token {

    public login: string;
    public password: string;

    constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
    }
}
