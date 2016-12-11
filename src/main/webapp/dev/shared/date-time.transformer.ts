import {Injectable} from "@angular/core";
/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */
@Injectable()
export class DateTimeTransformer {

    public serializeDateTime(date: Date) {
        return this.serializeDate(date) + 'T' + this.serializeTime(date);
    }

    public serializeDate(date: Date): string {
        return date.getFullYear()
            + '-' + this.addZero((date.getMonth() + 1))
            + '-' +
            this.addZero(date.getDate());
    }

    public serializeTime(time: Date) {
        return this.addZero(time.getHours())
            + ':' + this.addZero(time.getMinutes())
        + ':' + this.addZero(time.getSeconds());
        // + '.' + String( (time.getMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
        // + 'Z';
    }

    private addZero(day: number): number | string {
        if (day < 10) {
            return '0' + day;
        }
        return day;
    }

    public deserializeDateTime(date: string) {
        var parsed: Date = new Date();

        var dateTimeString: string[] = date.split('T');
        var dateString: string[] = dateTimeString[0].split('-');
        parsed.setFullYear(+dateString[0]);
        parsed.setMonth(((+dateString[1]) - 1));
        parsed.setDate(+dateString[2]);

        var timeString: string[] = dateTimeString[1].split(':');
        parsed.setHours(+timeString[0]);
        parsed.setMinutes(+timeString[1]);

        parsed.setSeconds(0, 0);

        return parsed;

    }
}