import {Subject} from "rxjs/Rx";
import {ErrorModel} from "../model/error.model";
import {Injectable} from "@angular/core";
import {I18nService} from "./i18n.service";
/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */

@Injectable()
export class ExceptionService {

    private _errorStream: Subject<ErrorModel>;


    constructor(private i18Service: I18nService) {
        this._errorStream = new Subject<ErrorModel>();
    }

    get errorStream() {
        return this._errorStream;
    }

    onError(e) {
        let error;

        try {
            error = e.json();
        } catch (e) {
            console.log("Parsing error object was failed", e);
        }

        let errorModel: ErrorModel = null;
        if (error) {
            if (error.cause === 'BadCredentialsException') {
                errorModel = new ErrorModel(this.i18Service.getMessage('exception.login'), null);
            } else if (error.cause === 'DisabledException') {
                errorModel = new ErrorModel(this.i18Service.getMessage('exception.disabled'), null)
            } else if (error.cause === 'DataIntegrityViolationException') {
                errorModel = new ErrorModel(this.i18Service.getMessage('exception.duplicate_email'), null);
            }else if (error.cause === 'InsufficientAuthenticationException') {
                errorModel = new ErrorModel(this.i18Service.getMessage('exception.sessionExpired'), null);
            }
        }

        if (!errorModel) {
            errorModel = new ErrorModel(this.i18Service.getMessage('exception.unavailable'), null);
        }
        this._errorStream.next(errorModel);

        console.log(e);
    }
}