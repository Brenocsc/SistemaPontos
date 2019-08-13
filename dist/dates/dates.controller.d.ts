import { DatesService } from './dates.service';
export declare class DatesController {
    private readonly dateService;
    constructor(dateService: DatesService);
    addUser(timeArrive: string, timeDeparture: string, day: number, month: number, year: number, cpf: string): Promise<{
        id: string;
    }>;
    getAllUsers(): Promise<{
        timeArrive: string;
        timeDeparture: string;
        day: number;
        month: number;
        year: number;
        cpf: string;
    }[]>;
    getUser(userCpf: string): Promise<{
        timeArrive: string;
        timeDeparture: string;
        day: number;
        month: number;
        year: number;
        cpf: string;
    }>;
    updateUser(timeArrive: string, timeDeparture: string, day: number, month: number, year: number, cpf: string): Promise<any>;
    removeProduct(userId: string): Promise<any>;
}
