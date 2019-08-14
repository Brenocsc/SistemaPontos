import { Model } from 'mongoose';
import { Point } from './points.model';
export declare class PointsService {
    private readonly pointModel;
    constructor(pointModel: Model<Point>);
    insertPoint(timeArrive: string, timeDeparture: string, cpf: string): Promise<string>;
    getPoint(): Promise<{
        _id: any;
        timeArrive: string;
        timeDeparture: string;
        cpf: string;
    }[]>;
    getSinglePoint(cpf: string): Promise<{
        Points: any;
    }>;
    getSinglePointOpen(cpf: string): Promise<{
        _id: any;
        timeArrive: string;
        timeDeparture: string;
        cpf: string;
    }>;
    updatePoint(id: string, cpf: string, newTimeArrive: string, newTimeDeparture: string): Promise<void>;
    closePoint(timeDeparture: string, cpf: string): Promise<void>;
    deletePoint(cpf: string): Promise<void>;
    private findPoint;
    private findPointOpen;
    private findPointArrive;
}
