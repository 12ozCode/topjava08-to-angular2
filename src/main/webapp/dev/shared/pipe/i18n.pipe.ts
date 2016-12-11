import {PipeTransform, Pipe} from "@angular/core";
import {I18nService} from "../../service/i18n.service";

/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */

@Pipe({name: 'i18nPipe',
    pure: false})
export class I18nPipe implements PipeTransform {

    constructor(private i18Service: I18nService) {
    }

    transform(value: any, args: any): any {
        return this.i18Service.getMessage(value);
    }
}