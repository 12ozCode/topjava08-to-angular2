import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams, RequestOptionsArgs} from "@angular/http";
import {Observable} from "rxjs";
import {UserMeal} from "../model/meal.model";
import {DateTimeTransformer} from "../shared/date-time.transformer";
import {reqOptions, mealPath, basePath, reqOptionsJson} from "../shared/config";
/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */

@Injectable()
export class MealService {

    constructor(private http: Http,
                private dateTimeTransformer: DateTimeTransformer) {
    }

    loadAllMeals(): Observable<UserMeal[]> {
        return this.http.get(basePath + mealPath, reqOptions)
            .map((res) => {
                return this.mapResponse(res);
            });
    }

    deleteMeal(meal: UserMeal): Observable<Response> {
        return this.http.delete(basePath + mealPath + '/' + meal.id, reqOptions);
    }

    mapResponse(resp) {
        let mealsList: UserMeal[] = resp.json();
        mealsList.forEach((meal: UserMeal) => {
            meal.dateTime = this.dateTimeTransformer.deserializeDateTime(meal.dateTime);
        });
        return mealsList;
    }

    save(userMeal: UserMeal): Observable<Response> {
        userMeal.dateTime = this.dateTimeTransformer.serializeDateTime(userMeal.dateTime);
        if (userMeal.id) {
            return this.update(userMeal);
        }
        else {
            return this.http.post(basePath + mealPath, JSON.stringify(userMeal), reqOptionsJson);
        }
    }

    private update(userMeal: UserMeal): Observable<Response> {
        return this.http.put(basePath + mealPath + '/' + userMeal.id, JSON.stringify(userMeal), reqOptionsJson);
    }

    getFilteredDataSet(startDate: Date, endDate: Date, startTime: Date, endTime: Date) {
        let getParams = new URLSearchParams();

        if (startDate != null) {
            getParams.set('startDate', this.dateTimeTransformer.serializeDate(startDate));
        }
        if (endDate != null) {
            getParams.set('endDate', this.dateTimeTransformer.serializeDate(endDate));
        }
        if (startTime != null) {
            getParams.set('startTime', this.dateTimeTransformer.serializeTime(startTime));
        }
        if (endTime != null) {
            getParams.set('endTime', this.dateTimeTransformer.serializeTime(endTime));
        }

        var clone: RequestOptionsArgs = Object.assign({}, reqOptions);
        clone.search = getParams;

        return this.http.get(basePath + mealPath + '/' + 'filter', clone).map((res) => {
            return this.mapResponse(res);
        });
    }
}