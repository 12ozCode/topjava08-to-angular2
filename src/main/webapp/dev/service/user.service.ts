import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {UserModel} from "../model/user.model";
import {Injectable} from "@angular/core";
import {DateTimeTransformer} from "../shared/date-time.transformer";
import {reqOptions, basePath, reqOptionsJson, registerPath, usersPath} from "../shared/config";
/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */

@Injectable()
export class UserService {


    constructor(private http: Http,
                private dateTimeTransformer: DateTimeTransformer) {
    }

    registerUser(value: UserModel): Observable<Response> {
        return this.http.post(basePath + registerPath, JSON.stringify(value), reqOptionsJson)
    }


    getUsers(): Observable<UserModel[]> {
        return this.http.get(basePath + usersPath, reqOptions).map(res => res.json());
    }

    delete(user: UserModel): Observable<Response> {
        return this.http.delete(basePath + usersPath + '/' + user.id, reqOptions);
    }

    saveUser(user: UserModel): Observable<Response> {
        if (user.id) {
            return this.updateUser(user);
        } else {
            return this.createUser(user);
        }
    }

    changeActiveStatus(user: UserModel): Observable<Response> {
        return this.http.patch(basePath + usersPath + '/' + user.id + '/' + user.enabled, null);
    }

    private updateUser(user: UserModel): Observable<Response> {
        return this.http.put(basePath + usersPath + '/' + user.id, JSON.stringify(user), reqOptionsJson);
    }

    private createUser(user: UserModel): Observable<Response> {

        return this.http.post(basePath + usersPath, JSON.stringify(user), reqOptionsJson);
    }
}