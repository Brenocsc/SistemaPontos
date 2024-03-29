import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Point } from './points.model';

@Injectable()
export class PointsService {
    constructor(@InjectModel('Point') private readonly pointModel: Model<Point>) { }

    async insertPoint(timeArrive: Date, timeDeparture: Date, cpf: string) {
        cpf = cpf.split('-').join('').split('.').join('')
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
            cpf: point.cpf,
            timeArrive: point.timeArrive,
            timeDeparture: point.timeDeparture,
            hours: this.sumTime(point, null)
        }));
    }

    async getTotalHours(cpf: string, currentDate: Date){
        cpf = this.formatCPF(cpf)
        const points = await this.findPoint(cpf, null, null)
        const timeCompleted = this.sumTimeTotal(points, currentDate)
        const timeLeft = (this.workingDays(points[0].timeArrive, currentDate) * 528) - timeCompleted
        return {
            timeCompleted:  Math.floor(timeCompleted/60) + ":" + ("0" + (timeCompleted % 60)).slice(-2),
            timeLeft:  Math.floor(timeLeft/60) + ":" + ("0" + (timeLeft % 60)).slice(-2)
        }
    }

    private workingDays(startDay: Date, endDay: Date){
        let totalDays = 0
        let varDate = this.formatCalender(startDay)
        const endDate = this.formatCalender(endDay)
        
        while(varDate !== endDate){
            if(new Date(varDate).getDay() !== 0 && new Date(varDate).getDay() !== 6){
                totalDays += 1
            }
            let auxDate = new Date(varDate)
            auxDate.setDate(auxDate.getDate() + 1)
            varDate = this.formatCalender(auxDate)
        }
        if(new Date(varDate).getDay() !== 0 && new Date(varDate).getDay() !== 6){
            totalDays += 1
        }
        return totalDays
    }

    private formatCalender(d: Date){
        const dd = String(new Date(d).getDate()).padStart(2, '0')
        const mm = String(new Date(d).getMonth() + 1).padStart(2, '0')
        const yyyy = new Date(d).getFullYear()
        return mm + '/' + dd + '/' + yyyy
    }

    async getDayHours(cpf: string, currentDate: Date) {
        cpf = this.formatCPF(cpf)
        const date = this.formatCalender(currentDate)

        const points = await this.findPoint(cpf, date , date +" 23:59:59")

        const timeCompleted = this.sumTimeTotal(points, currentDate)
        const timeLeft = 528 - timeCompleted
        return {
            timeCompleted:  Math.floor(timeCompleted/60) + ":" + ("0" + (timeCompleted % 60)).slice(-2),
            timeLeft:  Math.floor(timeLeft/60) + ":" + ("0" + (timeLeft % 60)).slice(-2)
        }
    }

    private sumMinutes(point, currentDate) {
        if(point.timeDeparture === null){
            if(currentDate === null)
                return 0
            else{
                const hours = new Date(currentDate).getHours() - new Date(point.timeArrive).getHours()
                const mins = new Date(currentDate).getMinutes() - new Date(point.timeArrive).getMinutes()
                return (hours * 60) + mins 
            }
        }
        const hours = new Date(point.timeDeparture).getHours() - new Date(point.timeArrive).getHours()
        const mins = new Date(point.timeDeparture).getMinutes() - new Date(point.timeArrive).getMinutes()
        return (hours * 60) + mins 
    }

    private sumTime(point, currentDate) {
        const minutes = this.sumMinutes(point, currentDate)
        if (minutes === 0) return " - "
        return Math.floor(minutes/60) + ":" + ("0" + (minutes % 60)).slice(-2)
    }

    private sumTimeTotal(points, currentDate) {
        const minutes = points.map((point) => this.sumMinutes(point, currentDate));
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        return minutes.reduce(reducer)
        //return Math.floor(minTotal/60) + ":" + ("0" + (minTotal % 60)).slice(-2)
    }

    async getPointCPF(cpf: string, date1: string, date2: string){
        cpf = cpf.split('-').join('').split('.').join('')
        const points = await this.findPoint(cpf, date1, date2)
        const Points = points.map((point) => ({
            _id: point._id,
            cpf: point.cpf,
            timeArrive: this.formatDate(point.timeArrive), 
            timeDeparture: this.formatDate(point.timeDeparture),
            hours: this.sumTime(point, null)   
        }));

        return { Points }
    }

    async getSinglePointOpen(cpf: string) {
        cpf = this.formatCPF(cpf)
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
        cpf = this.formatCPF(cpf)
        const updatedPoint = await this.findPointOpen(cpf);
        if (timeDeparture) {
            updatedPoint.timeDeparture = timeDeparture;
        }

        updatedPoint.save();
    }

    async deletePoint(cpf: string) {
        cpf = this.formatCPF(cpf)
        const result = await this.pointModel.deleteOne({ cpf }).exec();

        if (result.n === 0) {
            throw new NotFoundException("Could not find user");
        }
    }

    private formatDate(d: Date){
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        if(d !== null){
            let hora = new Date(d).getHours();
            let min = new Date(d).getMinutes();
            return (
                "data: " + new Date(d).getDate() +
                " " + months[new Date(d).getMonth()] + 
                " " + new Date(d).getFullYear() +
                " / hora: " + ("0" + hora).slice(-2) +
                ":" + ("0" + min).slice(-2)
            )
        }
        return " - ";
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

    private async findPoint(cpf: string, date1: string, date2: string) {
        let points;

        try {
            if(date1 && date2)
                points = this.pointModel.find({ cpf, timeArrive: { $gte: date1, $lte: date2 } })
            //else if(date1)
            //    points = this.pointModel.find({ cpf, timeArrive: { $gte: date1, $lte: date1+" 23:59:59" } })
            else
                points = await this.pointModel.find({ cpf }).exec();
        } catch (error) {
            throw new NotFoundException("Could not find point");
        }

        if (!points) {
            throw new NotFoundException("Could not find point");
        }

        return points;
    }
    
    private formatCPF(cpf: string){
        return cpf.split('-').join('').split('.').join('')
    }
}