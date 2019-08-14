import { Model } from 'mongoose';
import { Point } from './points.model';
export declare class PointsService {
    private readonly pointModel;
    constructor(pointModel: Model<Point>);
    insertPoint(timeArrive: string, timeDeparture: string, cpf: string): Promise<string>;
    getPoint(): Promise<{
        timeArrive: string;
        timeDeparture: string;
        cpf: string;
    }[]>;
    getSinglePoint(cpf: string): Promise<any>;
    getSinglePointOpen(cpf: string): Promise<{
        timeArrive: string;
        timeDeparture: string;
        cpf: string;
    }>;
    closePoint(timeDeparture: string, cpf: string): Promise<void>;
    deletePoint(cpf: string): Promise<void>;
    private findPoint;
    private findPointOpen;
}
