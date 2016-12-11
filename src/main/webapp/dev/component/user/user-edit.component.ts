/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */
import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserModel} from "../../model/user.model";

@Component({
    templateUrl: '../../../templates/user/user-edit.html',
    selector: 'user-edit'
})
export class UserEditComponent implements OnInit {
    userForm: FormGroup;

    showToggle: boolean = false;
    @Output()
    onSaveEvent:EventEmitter<UserModel> = new EventEmitter<UserModel>();

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.userForm = this.formBuilder.group(
            {
                id: [''],
                name: ['', Validators.required],
                email: ['', Validators.required],
                password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
            }
        )
    }

    fillUserForm(user: UserModel) {
        this.userForm.patchValue({
            id: user.id,
            name: user.name,
            email: user.email,
            // password: user.password
        });
    }

    onSave() {
        this.onSaveEvent.emit(this.userForm.value);
        this.userForm.reset();
        this.closeModal();
    }

    closeModal() {
        this.showToggle = false;
    }

    resetForm() {
        this.userForm.reset();
    }

}