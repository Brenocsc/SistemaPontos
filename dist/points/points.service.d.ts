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
    getSinglePoint(cpf: string): Promise<{
        Points: any;
    }>;
<<<<<<< HEAD
    getPointRange(PointCpf: string, date1: string, date2: string): Promise<{
        Points: any;
    }>;
=======
    formatDate(d: Date): string;
>>>>>>> cf11d1369ca137af00ebef9173db17f4e63cbb70
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
