import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Point } from './points.model';

@Injectable()
export class PointsService {
    constructor(@InjectModel('Point') private readonly pointModel: Model<Point>) { }

    async insertPoint(timeArrive: string, timeDeparture: string, cpf: string) {
        
        const newPoint = new this.pointModel({
            timeArrive,
            timeDeparture,
            cpf,
        });

        const result = await newPoint.save();
        return result.cpf as string;
    }

    async getPoint() {
        const points = await this.pointModel.find().exec();
        return points.map((point) => ({
            timeArrive: point.timeArrive,
            timeDeparture: point.timeDeparture,
            cpf: point.cpf,
        }));
    }

    async getSinglePoint(cpf: string) {
        const point = await this.findPoint(cpf);
        return {
            timeArrive: point.timeArrive,
            timeDeparture: point.timeDeparture,
            cpf: point.cpf,
        };
    }

    async updatePoint(timeArrive: string, timeDeparture: string, cpf: string) {  
        const updatedPoint = await this.findPoint(cpf);
        if(timeArrive){
            updatedPoint.timeArrive = timeArrive;
        }
        if(timeDeparture){
            updatedPoint.timeDeparture = timeDeparture;
        }
        if(cpf){
            updatedPoint.cpf = cpf;
        }
        
        updatedPoint.save();    
        
    }


    async deletePoint(cpf: string) {
        const result = await this.pointModel.deleteOne({cpf}).exec();

        if(result.n === 0){
            throw new NotFoundException("Could not find user");
        }
    }

    private async findPoint(cpf: string): Promise<Point> {
        let point;

        try {
            //user = await this.userModel.findById(cpf).exec();
            point = await this.pointModel.findOne({cpf}).exec();
        } catch (error) {
            throw new NotFoundException("Could not find user");
        }

        if(!point){
            throw new NotFoundException("Could not find user");
        }

        return point;
    }

}