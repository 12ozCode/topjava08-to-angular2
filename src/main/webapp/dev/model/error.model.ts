/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */
export class ErrorModel {

    severity: string;
    summary: string;
    detail: string;


    constructor(summary: string, detail: string) {
        this.severity = 'error';
        this.summary = summary;
        this.detail = detail;
    }
}