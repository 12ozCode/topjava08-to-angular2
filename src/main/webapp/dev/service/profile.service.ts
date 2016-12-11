import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {UserModel} from "../model/user.model";
import {Injectable} from "@angular/core";
import {DateTimeTransformer} from "../shared/date-time.transformer";
import {reqOptions, profilePath, basePath, reqOptionsJson} from "../shared/config";
/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */

@Injectable()
export class ProfileService {


    constructor(private http: Http,
                private dateTimeTransformer: DateTimeTransformer) {
    }

    getOwnProfile(): Observable<Response> {
        return this.http.get(basePath + profilePath, reqOptions);
    }

    saveOwnProfle(value: UserModel): Observable<Response> {
        return this.http.put(basePath + profilePath, JSON.stringify(value), reqOptionsJson);
    }
}