import { Model } from 'mongoose';
import { Date } from './dates.model';
export declare class DatesService {
    private readonly dateModel;
    constructor(dateModel: Model<Date>);
    insertDate(timeArrive: string, timeDeparture: string, day: number, month: number, year: number, cpf: string): Promise<string>;
    getDate(): Promise<{
        timeArrive: string;
        timeDeparture: string;
        day: number;
        month: number;
        year: number;
        cpf: string;
    }[]>;
    getSingleDate(cpf: string): Promise<{
        timeArrive: string;
        timeDeparture: string;
        day: number;
        month: number;
        year: number;
        cpf: string;
    }>;
    updateDate(timeArrive: string, timeDeparture: string, day: number, month: number, year: number, cpf: string): Promise<void>;
    deleteDate(cpf: string): Promise<void>;
    private findDate;
}
