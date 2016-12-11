/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */
import {FormControl} from "@angular/forms";

export class ValidateUtil {

    static validateMealCalories(formControl: FormControl) {
        console.log("validator minmax");
        if (formControl.value < 10 || formControl.value > 5000) {
            return {error: true}
        }
        return null;
    }

    static  validateUserCalories(formControl: FormControl) {
        console.log("validator minmax");
        if (formControl.value < 100 || formControl.value > 5000) {
            return {error: true}
        }
        return null;
    }
}

