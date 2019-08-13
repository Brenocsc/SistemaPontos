import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    addUser(userNome: string, userCpf: string, userEmail: string, userPod: string, userTelefone: string): Promise<{
        id: string;
    }>;
    getAllUsers(): Promise<{
        nome: string;
        cpf: string;
        email: string;
        pod: string;
        telefone: string;
    }[]>;
    getUser(userCpf: string): Promise<{
        nome: string;
        cpf: string;
        email: string;
        pod: string;
        telefone: string;
    }>;
    updateUser(userNome: string, userCpf: string, userEmail: string, userPod: string, userTelefone: string): Promise<any>;
    removeProduct(userId: string): Promise<any>;
}
