import { PointsService } from './points.service';
export declare class PointsController {
    private readonly pointService;
    constructor(pointService: PointsService);
    addUser(timeArrive: string, timeDeparture: string, cpf: string): Promise<{
        id: string;
    }>;
    getAllUsers(): Promise<{
        timeArrive: string;
        timeDeparture: string;
        cpf: string;
    }[]>;
    getUser(userCpf: string): Promise<{
        timeArrive: string;
        timeDeparture: string;
        cpf: string;
    }>;
    updateUser(timeArrive: string, timeDeparture: string, cpf: string): Promise<any>;
    removeProduct(userId: string): Promise<any>;
}
