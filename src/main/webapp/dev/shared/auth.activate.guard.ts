import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {AuthService} from "../service/auth.service";
import {Injectable} from "@angular/core";

/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */
@Injectable()
export class AuthActivateGuard implements CanActivate {


    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isAuthenticated().map(res => {
            if (!res) {
                this.router.navigate(["login"]);
            }
            return res;
        });
    }
}
