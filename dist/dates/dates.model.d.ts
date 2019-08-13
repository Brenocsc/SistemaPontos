import * as mongoose from 'mongoose';
export declare const DateSchema: mongoose.Schema<any>;
export interface Date extends mongoose.Document {
    timeArrive: string;
    timeDeparture: string;
    day: number;
    month: number;
    year: number;
    cpf: string;
}
