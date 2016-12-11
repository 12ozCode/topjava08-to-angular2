import {NgModule, APP_INITIALIZER} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {routing} from "./app.routes";
import {I18nService} from "./service/i18n.service";
import {I18Enum} from "./model/i18n.enum";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {DatePipe} from "@angular/common";
import {DateTimeTransformer} from "./shared/date-time.transformer";
import {GrowlModule} from "primeng/components/growl/growl";
import {ExceptionService} from "./service/exception.service";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {MealListComponent} from "./component/meal/meal-list.component";
import {EditMealComponent} from "./component/meal/meal-edit.component";
import {HeaderComponent} from "./component/auth/header.component";
import {ProfileComponent} from "./component/user/profile.component";
import {RegisterComponent} from "./component/user/register.component";
import {UserListComponent} from "./component/user/user-list.component";
import {UserEditComponent} from "./component/user/user-edit.component";
import {I18nPipe} from "./shared/pipe/i18n.pipe";
import {EntryComponent} from "./component/auth/entry.component";
import {AuthService} from "./service/auth.service";
import {AuthActivateGuard} from "./shared/auth.activate.guard";
import {MealService} from "./service/meal.service";
import {UserService} from "./service/user.service";
import {ProfileService} from "./service/profile.service";

/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, routing, CalendarModule, DataTableModule, GrowlModule],
    declarations: [AppComponent, MealListComponent, EntryComponent,
        EditMealComponent, HeaderComponent,
        ProfileComponent,
        RegisterComponent,
        UserListComponent,
        UserEditComponent,
        I18nPipe
    ],
    bootstrap: [AppComponent],
    providers: [AuthService, AuthActivateGuard, MealService, UserService, ProfileService,
        I18nService, DateTimeTransformer, DatePipe, ExceptionService,
        {
            provide: APP_INITIALIZER,
            // useFactory: (i18NService: I18nService) => () => i18NService.initMessages(I18Enum.ru),
            // or
            useFactory: initApp,
            deps: [I18nService],
            multi: true
        }
    ]
})
export class TopJavaModule {

}

export function initApp(i18nService: I18nService) {
    // Do initing of services that is required before app loads
    // NOTE: this factory needs to return a function (that then returns a promise)
    return () => i18nService.initMessages(I18Enum.ru);  // + any other services...
}