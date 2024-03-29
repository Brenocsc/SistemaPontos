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
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async addUser(userNome, userCpf, userEmail, userPod, userTelefone) {
        const generetedId = await this.userService.insertUser(userNome, userCpf, userEmail, userPod, userTelefone);
        return { id: generetedId };
    }
    async getAllUsers() {
        const users = await this.userService.getUsers();
        return users;
    }
    getUser(userCpf) {
        return this.userService.getSingleUser(userCpf);
    }
    async updateUser(userNome, userCpf, userEmail, userPod, userTelefone) {
        await this.userService.updateUser(userNome, userCpf, userEmail, userPod, userTelefone);
        return null;
    }
    async removeProduct(userId) {
        await this.userService.deleteUser(userId);
        return null;
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('nome')),
    __param(1, common_1.Body('cpf')),
    __param(2, common_1.Body('email')),
    __param(3, common_1.Body('pod')),
    __param(4, common_1.Body('telefone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addUser", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    common_1.Get(':cpf'),
    __param(0, common_1.Param('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUser", null);
__decorate([
    common_1.Put(':cpf'),
    __param(0, common_1.Body('nome')),
    __param(1, common_1.Param('cpf')),
    __param(2, common_1.Body('email')),
    __param(3, common_1.Body('pod')),
    __param(4, common_1.Body('telefone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    common_1.Delete(':cpf'),
    __param(0, common_1.Param('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeProduct", null);
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map