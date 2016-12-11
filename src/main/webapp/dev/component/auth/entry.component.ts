import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */

@Component({
    templateUrl: '../../../templates/auth/entry.html'
})
export class EntryComponent implements OnInit{

    private loginForm: FormGroup;

    constructor(private authService: AuthService,
                private formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            "login": ["", Validators.required],
            "password": ["", Validators.required]
        })
    }
}