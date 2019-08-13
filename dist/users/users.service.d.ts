import { Model } from 'mongoose';
import { User } from './users.model';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    insertUser(nome: string, cpf: string, email: string, pod: string, telefone: string): Promise<string>;
    getUsers(): Promise<{
        nome: string;
        cpf: string;
        email: string;
        pod: string;
        telefone: string;
    }[]>;
    getSingleUser(cpf: string): Promise<{
        nome: string;
        cpf: string;
        email: string;
        pod: string;
        telefone: string;
    }>;
    updateUser(nome: string, cpf: string, email: string, pod: string, telefone: string): Promise<void>;
    deleteUser(cpf: string): Promise<void>;
    private findUser;
}
