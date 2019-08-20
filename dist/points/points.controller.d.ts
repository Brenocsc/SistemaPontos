import { PointsService } from './points.service';
export declare class PointsController {
    private readonly pointService;
    constructor(pointService: PointsService);
    addPoint(timeArrive: Date, timeDeparture: Date, cpf: string): Promise<{
        id: string;
    }>;
    getAllPoints(): Promise<{
        _id: any;
        cpf: string;
        timeArrive: Date;
        timeDeparture: Date;
        hours: string;
    }[]>;
    getHours(PointCpf: string): Promise<void>;
    getPointRange(PointCpf: string, date1: string, date2: string): Promise<{
        Points: any;
    }>;
    getPointOpen(PointCpf: string): Promise<{
        _id: any;
        timeArrive: Date;
        timeDeparture: Date;
        cpf: string;
    }>;
    closePoint(timeDeparture: Date, cpf: string): Promise<any>;
    updatePoint(pointId: string, timeArrive: Date, timeDeparture: Date): Promise<any>;
    removeProduct(userId: string): Promise<any>;
}
