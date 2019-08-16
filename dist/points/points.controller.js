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
const points_service_1 = require("./points.service");
let PointsController = class PointsController {
    constructor(pointService) {
        this.pointService = pointService;
    }
    async addUser(timeArrive, timeDeparture, cpf) {
        const generetedId = await this.pointService.insertPoint(timeArrive, timeDeparture, cpf);
        return { id: generetedId };
    }
    async getAllUsers() {
        const users = await this.pointService.getPoint();
        return users;
    }
    getPoint(PointCpf) {
        return this.pointService.getSinglePoint(PointCpf);
    }
    getPointOpen(PointCpf) {
        return this.pointService.getSinglePointOpen(PointCpf);
    }
    async closePoint(timeDeparture, cpf) {
        await this.pointService.closePoint(timeDeparture, cpf);
        return null;
    }
    async updatePoint(pointId, timeArrive, timeDeparture) {
        await this.pointService.updatePoint(pointId, timeArrive, timeDeparture);
        return null;
    }
    async removeProduct(userId) {
        await this.pointService.deletePoint(userId);
        return null;
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('timeArrive')),
    __param(1, common_1.Body('timeDeparture')),
    __param(2, common_1.Body('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PointsController.prototype, "addUser", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PointsController.prototype, "getAllUsers", null);
__decorate([
    common_1.Get(':cpf'),
    __param(0, common_1.Param('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PointsController.prototype, "getPoint", null);
__decorate([
    common_1.Get(':cpf/open'),
    __param(0, common_1.Param('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PointsController.prototype, "getPointOpen", null);
__decorate([
    common_1.Put(':cpf/open'),
    __param(0, common_1.Body('timeDeparture')),
    __param(1, common_1.Param('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PointsController.prototype, "closePoint", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('timeArrive')),
    __param(2, common_1.Body('timeDeparture')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PointsController.prototype, "updatePoint", null);
__decorate([
    common_1.Delete(':cpf'),
    __param(0, common_1.Param('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PointsController.prototype, "removeProduct", null);
PointsController = __decorate([
    common_1.Controller('points'),
    __metadata("design:paramtypes", [points_service_1.PointsService])
], PointsController);
exports.PointsController = PointsController;
//# sourceMappingURL=points.controller.js.map