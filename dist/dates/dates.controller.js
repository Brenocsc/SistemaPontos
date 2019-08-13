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
const dates_service_1 = require("./dates.service");
let DatesController = class DatesController {
    constructor(dateService) {
        this.dateService = dateService;
    }
    async addUser(timeArrive, timeDeparture, day, month, year, cpf) {
        const generetedId = await this.dateService.insertDate(timeArrive, timeDeparture, day, month, year, cpf);
        return { id: generetedId };
    }
    async getAllUsers() {
        const users = await this.dateService.getDate();
        return users;
    }
    getUser(userCpf) {
        return this.dateService.getSingleDate(userCpf);
    }
    async updateUser(timeArrive, timeDeparture, day, month, year, cpf) {
        await this.dateService.updateDate(timeArrive, timeDeparture, day, month, year, cpf);
        return null;
    }
    async removeProduct(userId) {
        await this.dateService.deleteDate(userId);
        return null;
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('timeArrive')),
    __param(1, common_1.Body('timeDeparture')),
    __param(2, common_1.Body('day')),
    __param(3, common_1.Body('month')),
    __param(4, common_1.Body('year')),
    __param(5, common_1.Body('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], DatesController.prototype, "addUser", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatesController.prototype, "getAllUsers", null);
__decorate([
    common_1.Get(':cpf'),
    __param(0, common_1.Param('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DatesController.prototype, "getUser", null);
__decorate([
    common_1.Put(':cpf'),
    __param(0, common_1.Body('timeArrive')),
    __param(1, common_1.Body('timeDeparture')),
    __param(2, common_1.Body('day')),
    __param(3, common_1.Body('month')),
    __param(4, common_1.Body('year')),
    __param(5, common_1.Param('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], DatesController.prototype, "updateUser", null);
__decorate([
    common_1.Delete(':cpf'),
    __param(0, common_1.Param('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DatesController.prototype, "removeProduct", null);
DatesController = __decorate([
    common_1.Controller('dates'),
    __metadata("design:paramtypes", [dates_service_1.DatesService])
], DatesController);
exports.DatesController = DatesController;
//# sourceMappingURL=dates.controller.js.map