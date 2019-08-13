import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    cpf: { type: String, required: true},
    email: { type: String, required: true},
    pod: { type: String, required: true},
    telefone: { type: String, required: true},
});

export interface User extends mongoose.Document{
    nome: string,
    cpf: string,
    email: string,
    pod: string,
    telefone: string,
}