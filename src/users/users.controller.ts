import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController{
    constructor(private readonly userService : UsersService){}

    @Post()
    async addUser(
     @Body('nome') userNome : string,
     @Body('cpf') userCpf : string,
     @Body('email') userEmail : string,
     @Body('pod') userPod : string,
     @Body('telefone') userTelefone : string,
     ) {
        const generetedId = await this.userService.insertUser(userNome, userCpf, userEmail,userPod,userTelefone);
        
        return {id: generetedId};
    }

    @Get()
    async getAllUsers(){
        const users = await this.userService.getUsers();
        return users;
    }

    @Get(':cpf')
    getUser(@Param('cpf') userCpf : string){
        return this.userService.getSingleUser(userCpf);
    }

    @Put(':cpf')
    async updateUser(
        @Body('nome') userNome : string,
        @Param('cpf') userCpf : string,
        @Body('email') userEmail : string,
        @Body('pod') userPod : string,
        @Body('telefone') userTelefone : string,
        ){
            await this.userService.updateUser(userNome, userCpf, userEmail,userPod,userTelefone);
            return null;
        }

    @Delete(':cpf')
    async removeProduct(
        @Param('cpf') userId : string,
    ){
        await this.userService.deleteUser(userId);
        return null;
    }
}