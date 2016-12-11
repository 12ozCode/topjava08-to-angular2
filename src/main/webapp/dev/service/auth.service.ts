/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */
import {Injectable} from "@angular/core";
import {Token} from "../model/auth.token";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Router} from "@angular/router";
import {UserModel} from "../model/user.model";
import {Observable} from "rxjs/Rx";
import {ExceptionService} from "./exception.service";
import {basePath, loginPath} from "../shared/config";
import {ProfileService} from "./profile.service";


@Injectable()
export class AuthService {

    private _authenticatedAs: UserModel = null;

    constructor(private http: Http,
                private router: Router,
                private profileService: ProfileService,
                private exceptionService: ExceptionService) {
    }

    login(token: Token): void {

        let headers: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'});
        let options = new RequestOptions({
            headers: headers,
            withCredentials: true
        });
        this.http.post(basePath + loginPath,
            "username=" + token.login +
            "&password=" + token.password,
            options).map(res => {
            return res;
        }).subscribe(
            res => {
                this.router.navigate(["meal-list"])
            },
            error => {
                this.exceptionService.onError(error);
            }
        );
    }

    get authenticatedAs(): UserModel {
        return this._authenticatedAs;
    }

    set authenticatedAs(value: UserModel) {
        this._authenticatedAs = value;
    }

    hasAdminRole(): boolean {
        return this._authenticatedAs.roles.includes("ROLE_ADMIN");
    }

    logout() {
        this.http.get(basePath + "/logout").subscribe();
        this._authenticatedAs = null;
    }

    isAuthenticated(): Observable<boolean> {
        if (this._authenticatedAs == null) {
            return this.profileService.getOwnProfile().map(res => {
                this._authenticatedAs = res.json();
                return true;
            }).catch((error: any) => {
                this._authenticatedAs = null;
                this.exceptionService.onError(error);
                return Observable.of(false);
            });
        } else {
            return Observable.of(true);
        }
    }
}
