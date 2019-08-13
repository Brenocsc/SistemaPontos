import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserSchema } from "./users.model";

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'User',
        schema: UserSchema,  
    }])],
    controllers : [UsersController],
    providers: [UsersService],
})

export class UsersModule {}