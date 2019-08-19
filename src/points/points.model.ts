import * as mongoose from 'mongoose';

export const PointSchema = new mongoose.Schema({
    timeArrive: { type: Date, required: true},
    timeDeparture: { type: Date, required: false},
    cpf: { type: String, required: true},
});

export interface Point extends mongoose.Document{
    timeArrive: Date,
    timeDeparture: Date,
    cpf: string,
}
