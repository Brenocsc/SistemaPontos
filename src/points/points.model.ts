import * as mongoose from 'mongoose';

export const PointSchema = new mongoose.Schema({
    timeArrive: { type: String, required: true},
    timeDeparture: { type: String, required: false},
    cpf: { type: String, required: true},
});

export interface Point extends mongoose.Document{
    timeArrive: string,
    timeDeparture: string,
    cpf: string,
}
