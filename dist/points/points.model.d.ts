import * as mongoose from 'mongoose';
export declare const PointSchema: mongoose.Schema<any>;
export interface Point extends mongoose.Document {
    timeArrive: Date;
    timeDeparture: Date;
    cpf: string;
}
