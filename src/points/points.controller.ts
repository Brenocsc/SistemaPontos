import { Controller, Post, Body, Get, Query, Param, Put, Delete } from '@nestjs/common';

import { PointsService } from './points.service';

@Controller('points')
export class PointsController {
    constructor(private readonly pointService: PointsService) { }

    @Post()
    async addPoint(
        @Body('timeArrive') timeArrive: Date,
        @Body('timeDeparture') timeDeparture: Date,
        @Body('cpf') cpf: string,
    ) {
        const generetedId = await this.pointService.insertPoint(timeArrive, timeDeparture, cpf);

        return { id: generetedId };
    }

    @Get()
    async getAllPoints() {
        const users = await this.pointService.getPoint();
        return users;
    }
    
    @Get(':cpf')
    getPointRange(
        @Param('cpf') PointCpf: string,	
        @Query('d1') date1: string,
        @Query('d2') date2: string,
    ) {
        return this.pointService.getPointCPF(PointCpf, date1, date2);
    }

    @Get(':cpf/open')
    getPointOpen(@Param('cpf') PointCpf: string) {
        return this.pointService.getSinglePointOpen(PointCpf);
    }

    @Put(':cpf/open')
    async closePoint(
        @Body('timeDeparture') timeDeparture: Date,
        @Param('cpf') cpf: string,
    ) {
        await this.pointService.closePoint(timeDeparture, cpf);
        return null;
    }
    
    @Put(':id')
    async updatePoint(
        @Param('id') pointId : string,
        @Body('timeArrive') timeArrive: Date,
        @Body('timeDeparture') timeDeparture: Date,
        ){
            await this.pointService.updatePoint(pointId, timeArrive, timeDeparture);
            return null;
        }

    @Delete(':cpf')
    async removeProduct(
        @Param('cpf') userId: string,
    ) {
        await this.pointService.deletePoint(userId);
        return null;
    }
}