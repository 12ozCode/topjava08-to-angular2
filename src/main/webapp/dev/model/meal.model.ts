/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */

export class UserMeal {

    id: number;
    dateTime;
    description: string;
    calories: number;
    exceed: boolean;

    constructor(dateTime, description: string, calories: number) {
        this.dateTime = dateTime;
        this.description = description;
        this.calories = calories;
    }
}