import {Routes, RouterModule} from "@angular/router";
import {MealListComponent} from "./component/meal/meal-list.component";
import {AuthActivateGuard} from "./shared/auth.activate.guard";
import {ProfileComponent} from "./component/user/profile.component";
import {RegisterComponent} from "./component/user/register.component";
import {UserListComponent} from "./component/user/user-list.component";
import {EntryComponent} from "./component/auth/entry.component";
import {ModuleWithProviders} from "@angular/core";

/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */


const appRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/meal-list",
    },
    {
        path: "login",
        component: EntryComponent,
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "meal-list",
        component: MealListComponent,
        canActivate: [AuthActivateGuard],
    },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthActivateGuard]
    },
    {
        path: "user-list",
        component: UserListComponent,
        canActivate: [AuthActivateGuard]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
