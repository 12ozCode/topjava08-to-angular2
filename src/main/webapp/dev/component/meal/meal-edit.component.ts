/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */
import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserMeal} from "../../model/meal.model";
import {ValidateUtil} from "../../validators/validate.util";

@Component({
    templateUrl: '../../templates/meal/meal-edit.html',
    selector: 'edit-meal'
})
export class EditMealComponent implements OnInit {

    showToggle: boolean = false;

    mealForm: FormGroup;

    @Output()
    onSaveEvent: EventEmitter<UserMeal> = new EventEmitter<UserMeal>();

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.mealForm = this.formBuilder.group({
            id: [''],
            dateTime: [null, Validators.required],
            description: [``, Validators.required],
            calories: [``, Validators.compose([Validators.required, ValidateUtil.validateMealCalories])]
        });
    }

    fillMyForm(userMeal: UserMeal) {
        this.mealForm.patchValue(userMeal);
    }

    resetForm() {
        this.mealForm.reset();
    }

    onSave() {
        let value = this.mealForm.value;
        this.onSaveEvent.emit(value);
        this.mealForm.reset();
    }
}