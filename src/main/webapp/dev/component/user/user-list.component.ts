import {Component, ViewChild, OnInit} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {UserEditComponent} from "./user-edit.component";
import {UserModel} from "../../model/user.model";
import {UserService} from "../../service/user.service";
import {I18nService} from "../../service/i18n.service";
import {ExceptionService} from "../../service/exception.service";

/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */

@Component({
    templateUrl: "../../../templates/user/user-list.html"
})
export class UserListComponent implements OnInit {

    usersHolder: Observable<UserModel[]>;

    @ViewChild(UserEditComponent)
    private userEditChild: UserEditComponent;

    constructor(private userService: UserService,
                private i18Service: I18nService,
                private exceptionService: ExceptionService) {
    }

    ngOnInit(): void {
        this.reloadUsers();
    }

    private reloadUsers() {
        this.usersHolder = this.userService.getUsers();
    }

    showCreateModal() {
        this.userEditChild.resetForm();
        this.userEditChild.showToggle = true;
    }

    onEdit(user) {
        this.showCreateModal();
        this.userEditChild.fillUserForm(user.data);
    }

    onSave(user: UserModel) {
        this.userService.saveUser(user)
            .subscribe(
                res => {
                    this.reloadUsers();
                },
                err => {
                    this.exceptionService.onError(err);
                }
            );
    }

    onDelete(user: UserModel) {
        this.userService.delete(user).subscribe(
            res => {
                this.reloadUsers();
            }
        );
    }

    onChangeActiveStatus(user: UserModel) {
        user.enabled = !user.enabled;
        this.userService.changeActiveStatus(user)
            .subscribe(
                res => {
                    this.reloadUsers();
                },
                err => {
                    this.exceptionService.onError(err);
                }
            );
    }

}