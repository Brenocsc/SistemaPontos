import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any>;
export interface User extends mongoose.Document {
    nome: string;
    cpf: string;
    email: string;
    pod: string;
    telefone: string;
}
