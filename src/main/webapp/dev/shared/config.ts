import {RequestOptions, Headers} from "@angular/http";
/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */

export const basePath: string = '/topjava-rs';
export const loginPath: string = "/spring_security_check";
export const mealPath: string = '/rest/profile/meals';
export const profilePath: string = '/rest/profile';
export const registerPath: string = '/register';
export const usersPath: string = '/rest/admin/users';
export const i18nPath: string = '/i18n';


export const headers: Headers = new Headers({
  'Content-Type': 'application/json'
});
export const reqOptions: RequestOptions = new RequestOptions({
  withCredentials: true
});
export const reqOptionsJson: RequestOptions = new RequestOptions({
  withCredentials: true,
  headers: headers
});
