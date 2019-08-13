import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';

import { PointsService } from './points.service';

@Controller('points')
export class PointsController{
    constructor(private readonly pointService : PointsService){}

    @Post()
    async addUser(
     @Body('timeArrive') timeArrive : string,
     @Body('timeDeparture') timeDeparture : string,
     @Body('cpf') cpf: string,
     ) {
        const generetedId = await this.pointService.insertPoint(timeArrive, timeDeparture, cpf);
        
        return {id: generetedId};
    }

    @Get()
    async getAllUsers(){
        const users = await this.pointService.getPoint();
        return users;
    }

    @Get(':cpf')
    getUser(@Param('cpf') userCpf : string){
        return this.pointService.getSinglePoint(userCpf);
    }

    @Put(':cpf')
    async updateUser(
        @Body('timeArrive') timeArrive : string,
        @Body('timeDeparture') timeDeparture : string,
        @Param('cpf') cpf : string,
        ){
            await this.pointService.updatePoint(timeArrive, timeDeparture, cpf);
            return null;
        }

    @Delete(':cpf')
    async removeProduct(
        @Param('cpf') userId : string,
    ){
        await this.pointService.deletePoint(userId);
        return null;
    }
}