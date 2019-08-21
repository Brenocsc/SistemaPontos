import { Model } from 'mongoose';
import { Point } from './points.model';
export declare class PointsService {
    private readonly pointModel;
    constructor(pointModel: Model<Point>);
    insertPoint(timeArrive: Date, timeDeparture: Date, cpf: string): Promise<string>;
    getPoint(): Promise<{
        _id: any;
        cpf: string;
        timeArrive: Date;
        timeDeparture: Date;
        hours: string;
    }[]>;
    getDayHours(cpf: string, currentDate: Date): Promise<string>;
    private sumMinutes;
    private sumTime;
    private sumTimeTotal;
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
    private findPointOpen;
    private findPointArrive;
    private findPoint;
}
