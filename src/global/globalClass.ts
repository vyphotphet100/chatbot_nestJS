import { Expose } from "class-transformer";

export class ResponseData {
    data?: any
    statusCode?: number;
    message?: string;

    constructor(data: any, statusCode: number, message: string) {
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;

        return this;
    }
}
