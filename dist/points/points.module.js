"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const points_controller_1 = require("./points.controller");
const points_service_1 = require("./points.service");
const points_model_1 = require("./points.model");
let PointsModule = class PointsModule {
};
PointsModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{
                    name: 'Point',
                    schema: points_model_1.PointSchema,
                }])],
        controllers: [points_controller_1.PointsController],
        providers: [points_service_1.PointsService],
    })
], PointsModule);
exports.PointsModule = PointsModule;
//# sourceMappingURL=points.module.js.map