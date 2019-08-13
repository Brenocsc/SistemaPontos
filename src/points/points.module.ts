import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PointsController } from "./points.controller";
import { PointsService } from "./points.service";
import { PointSchema } from "./points.model";

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'Point',
        schema: PointSchema,  
    }])],
    controllers : [PointsController],
    providers: [PointsService],
})

export class PointsModule {}