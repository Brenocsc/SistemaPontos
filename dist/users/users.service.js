"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async insertUser(nome, cpf, email, pod, telefone) {
        const newUser = new this.userModel({
            nome,
            cpf,
            email,
            pod,
            telefone,
        });
        const result = await newUser.save();
        return result.cpf;
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
    async getSingleUser(cpf) {
        const user = await this.findUser(cpf);
        return {
            nome: user.nome,
            cpf: user.cpf,
            email: user.email,
            pod: user.pod,
            telefone: user.telefone,
        };
    }
    async updateUser(nome, cpf, email, pod, telefone) {
        const updatedUser = await this.findUser(cpf);
        if (nome) {
            updatedUser.nome = nome;
        }
        if (cpf) {
            updatedUser.cpf = cpf;
        }
        if (email) {
            updatedUser.email = email;
        }
        if (pod) {
            updatedUser.pod = pod;
        }
        if (telefone) {
            updatedUser.telefone = telefone;
        }
        updatedUser.save();
    }
    async deleteUser(cpf) {
        const result = await this.userModel.deleteOne({ cpf }).exec();
        if (result.n === 0) {
            throw new common_1.NotFoundException("Could not find user");
        }
    }
    async findUser(cpf) {
        let user;
        try {
            user = await this.userModel.findOne({ cpf }).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException("Could not find user");
        }
        if (!user) {
            throw new common_1.NotFoundException("Could not find user");
        }
        return user;
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map