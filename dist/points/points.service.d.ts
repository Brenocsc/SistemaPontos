import { Model } from 'mongoose';
import { Point } from './points.model';
export declare class PointsService {
    private readonly pointModel;
    constructor(pointModel: Model<Point>);
    insertPoint(timeArrive: Date, timeDeparture: Date, cpf: string): Promise<string>;
    getPoint(): Promise<{
        _id: any;
        timeArrive: Date;
        timeDeparture: Date;
        cpf: string;
    }[]>;
    getPointCPF(cpf: string, date1: string, date2: string): Promise<{
        Points: any;
    }>;
    getSinglePointOpen(cpf: string): Promise<{
        _id: any;
        timeArrive: Date;
        timeDeparture: Date;
        cpf: string;
    }>;
    updatePoint(id: string, timeArrive: Date, timeDeparture: Date): Promise<void>;
    closePoint(timeDeparture: Date, cpf: string): Promise<void>;
    deletePoint(cpf: string): Promise<void>;
    private formatDate;
    private findPoint;
    private findPointOpen;
    private findPointArrive;
    private findPointRange;
}
