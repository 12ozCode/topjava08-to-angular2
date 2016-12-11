import {Component, ViewChild, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {EditMealComponent} from "./meal-edit.component";
import {UserMeal} from "../../model/meal.model";
import {MealService} from "../../service/meal.service";

/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */

@Component({
    templateUrl: '../../../templates/meal/meal-list.html'
})
export class MealListComponent implements OnInit {

    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;

    mealsHolder: Observable<UserMeal[]>;

    @ViewChild(EditMealComponent)
    private editMealChild: EditMealComponent;

    constructor(private mealService: MealService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.mealsHolder = this.mealService.loadAllMeals();
    }

    updateList() {
        this.mealsHolder = this.mealService.loadAllMeals();
    }

    deleteItem(meal: UserMeal) {
        this.mealService.deleteMeal(meal).subscribe(res => {
            this.updateList();
        });
    }

    showCreateModal() {
        this.editMealChild.resetForm();
        this.editMealChild.showToggle = true;
    }

    selectMeal(meal) {
        this.editMealChild.showToggle = true;
        this.editMealChild.fillMyForm(meal.data);
    }

    save(userMeal: UserMeal) {
        this.editMealChild.showToggle = false;
        this.mealService.save(userMeal).subscribe(
            res => {
                this.updateList();
            }
        );
    }

    onFilter() {
        this.mealsHolder = this.mealService.getFilteredDataSet(
            this.startDate,
            this.endDate,
            this.startTime,
            this.endTime);
    }

    clearFilters() {
        this.startDate = null;
        this.endDate = null;
        this.startTime = null;
        this.endTime = null;
        this.updateList();
    }

    getRowClass(rowData: UserMeal, rowIndex): string {
        return rowData.exceed ? "exceeded" : null;
    }
}