import { PointsService } from './points.service';
export declare class PointsController {
    private readonly pointService;
    constructor(pointService: PointsService);
    addUser(timeArrive: string, timeDeparture: string, cpf: string): Promise<{
        id: string;
    }>;
    getAllUsers(): Promise<{
        _id: any;
        timeArrive: string;
        timeDeparture: string;
        cpf: string;
    }[]>;
    getPoint(PointCpf: string): Promise<{
        Points: any;
    }>;
    getPointOpen(PointCpf: string): Promise<{
        _id: any;
        timeArrive: string;
        timeDeparture: string;
        cpf: string;
    }>;
    closePoint(timeDeparture: string, cpf: string): Promise<any>;
    updatePoint(pointId: string, cpf: string, newTimeArrive: string, newTimeDeparture: string): Promise<any>;
    removeProduct(userId: string): Promise<any>;
}
