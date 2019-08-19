import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Point } from './points.model';

@Injectable()
export class PointsService {
    constructor(@InjectModel('Point') private readonly pointModel: Model<Point>) { }

    async insertPoint(timeArrive: Date, timeDeparture: Date, cpf: string) {

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
            _id: point._id,
            timeArrive: point.timeArrive,
            timeDeparture: point.timeDeparture,
            cpf: point.cpf,
        }));
    }

    async getSinglePoint(cpf: string) {
        const point = await this.findPoint(cpf);
        const Points = point.map((point) => ({
            _id: point._id,
            timeArrive: this.formatDate(point.timeArrive),
            timeDeparture: this.formatDate(point.timeDeparture),
            cpf: point.cpf,
        }));

        return { Points }
    }

    async getPointRange(PointCpf: string, date1: string, date2: string){
        const points = await this.findPointRange(PointCpf, date1, date2)
        const Points = points.map((point) => ({
            _id: point._id,
            timeArrive: (
                this.formatDate(point.timeArrive)
            ), 
            timeDeparture: (
                this.formatDate(point.timeDeparture)
            ), 
            cpf: point.cpf,
        }));
        
        return { Points }
    }

    async getSinglePointOpen(cpf: string) {
        const point = await this.findPointOpen(cpf);
        return {
            _id: point._id,
            timeArrive: point.timeArrive,
            timeDeparture: point.timeDeparture,
            cpf: point.cpf,
        };
    }

    async updatePoint(id: string, timeArrive: Date, timeDeparture: Date) {
        const updatedPoint = await this.findPointArrive(id);
        
        if(timeArrive){
            const hour = timeArrive[0] + timeArrive[1]
            const min = timeArrive[3] + timeArrive[4]
            const date = new Date(updatedPoint.timeArrive)
            date.setHours(Number(hour))
            date.setMinutes(Number(min))
            updatedPoint.timeArrive = date
        }

        if(timeDeparture){
            const hour = timeDeparture[0] + timeDeparture[1]
            const min = timeDeparture[3] + timeDeparture[4]
            const date = new Date(updatedPoint.timeDeparture)
            date.setHours(Number(hour))
            date.setMinutes(Number(min))
            updatedPoint.timeDeparture = date
        }

        updatedPoint.save();
    }

    async closePoint(timeDeparture: Date, cpf: string) {
        const updatedPoint = await this.findPointOpen(cpf);
        if (timeDeparture) {
            updatedPoint.timeDeparture = timeDeparture;
        }

        updatedPoint.save();

    }

    async deletePoint(cpf: string) {
        const result = await this.pointModel.deleteOne({ cpf }).exec();

        if (result.n === 0) {
            throw new NotFoundException("Could not find user");
        }
    }

    private formatDate(d: Date){
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        if(d !== null){
            return (
                "data: " + new Date(d).getDate() +
                " " + months[new Date(d).getMonth()] + 
                " " + new Date(d).getFullYear() +
                " / hora: " + new Date(d).getHours() +
                ":" + new Date(d).getMinutes()
            )
        }
        return " - ";
    }

    private async findPoint(cpf: string): Promise<any> {
        let point;
        try {
            point = await this.pointModel.find({ cpf }).exec();
        } catch (error) {
            throw new NotFoundException("Could not find point");
        }

        if (!point) {
            throw new NotFoundException("Could not find point");
        }

        return point;
    }

    private async findPointOpen(cpf: string): Promise<Point> {
        let point;

        try {
            point = await this.pointModel.findOne({ cpf, timeDeparture: null }).exec();
        } catch (error) {
            throw new NotFoundException("Could not find point opened");
        }

        if (!point) {
            throw new NotFoundException("Could not find point opened");
        }

        return point;
    }

    private async findPointArrive(id: string): Promise<Point> {
        let point;

        try {
            point = await this.pointModel.findOne({ _id: id }).exec();
        } catch (error) {
            throw new NotFoundException("Could not find point opened");
        }

        if (!point) {
            throw new NotFoundException("Could not find point opened");
        }

        return point;
    }

    private async findPointRange(cpf: string, date1: string, date2: string) {
        let points;
        try {
            points = this.pointModel.find({ timeArrive: { $gte: date1, $lte: date2 } })
        } catch (error) {
            throw new NotFoundException("Could not find point");
        }

        if (!points) {
            throw new NotFoundException("Could not find point");
        }

        return points;
    }
}