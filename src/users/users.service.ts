import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async insertUser(nome: string, cpf: string, email: string, pod: string, telefone: string) {
        const newUser = new this.userModel({
            nome,
            cpf,
            email,
            pod,
            telefone,
        });

        const result = await newUser.save();
        return result.cpf as string;
    }

    async getUsers() {
        const users = await this.userModel.find().exec();
        return users.map((user) => ({
            nome: user.nome,
            cpf: user.cpf,
            email: user.email,
            pod: user.pod,
            telefone: user.telefone,
        }));
    }

    async getSingleUser(cpf: string) {
        const user = await this.findUser(cpf);
        return {
            nome: user.nome,
            cpf: user.cpf,
            email: user.email,
            pod: user.pod,
            telefone: user.telefone,
        };
    }

    async updateUser(nome: string, cpf: string, email: string, pod: string, telefone: string) {  
        const updatedUser = await this.findUser(cpf);
        if(nome){
            updatedUser.nome = nome;
        }
        if(cpf){
            updatedUser.cpf = cpf;
        }
        if(email){
            updatedUser.email = email;
        }
        if(pod){
            updatedUser.pod = pod;
        }
        if(telefone){
            updatedUser.telefone = telefone;
        }
        
        updatedUser.save();    
        
    }


    async deleteUser(cpf: string) {
        const result = await this.userModel.deleteOne({cpf}).exec();

        if(result.n === 0){
            throw new NotFoundException("Could not find user");
        }
    }

    private async findUser(cpf: string): Promise<User> {
        let user;

        try {
            //user = await this.userModel.findById(cpf).exec();
            user = await this.userModel.findOne({cpf}).exec();
        } catch (error) {
            throw new NotFoundException("Could not find user");
        }

        if(!user){
            throw new NotFoundException("Could not find user");
        }

        return user;
    }
}