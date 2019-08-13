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
let DatesService = class DatesService {
    constructor(dateModel) {
        this.dateModel = dateModel;
    }
    async insertDate(timeArrive, timeDeparture, day, month, year, cpf) {
        const newDate = new this.dateModel({
            timeArrive,
            timeDeparture,
            day,
            month,
            year,
            cpf,
        });
        const result = await newDate.save();
        return result.cpf;
    }
    async getDate() {
        const dates = await this.dateModel.find().exec();
        return dates.map((date) => ({
            timeArrive: date.timeArrive,
            timeDeparture: date.timeDeparture,
            day: date.day,
            month: date.month,
            year: date.year,
            cpf: date.cpf,
        }));
    }
    async getSingleDate(cpf) {
        const date = await this.findDate(cpf);
        return {
            timeArrive: date.timeArrive,
            timeDeparture: date.timeDeparture,
            day: date.day,
            month: date.month,
            year: date.year,
            cpf: date.cpf,
        };
    }
    async updateDate(timeArrive, timeDeparture, day, month, year, cpf) {
        const updatedDate = await this.findDate(cpf);
        if (timeArrive) {
            updatedDate.timeArrive = timeArrive;
        }
        if (timeDeparture) {
            updatedDate.timeDeparture = timeDeparture;
        }
        if (day) {
            updatedDate.day = day;
        }
        if (month) {
            updatedDate.month = month;
        }
        if (year) {
            updatedDate.year = year;
        }
        if (cpf) {
            updatedDate.cpf = cpf;
        }
        updatedDate.save();
    }
    async deleteDate(cpf) {
        const result = await this.dateModel.deleteOne({ cpf }).exec();
        if (result.n === 0) {
            throw new common_1.NotFoundException("Could not find user");
        }
    }
    async findDate(cpf) {
        let date;
        try {
            date = await this.dateModel.findOne({ cpf }).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException("Could not find user");
        }
        if (!date) {
            throw new common_1.NotFoundException("Could not find user");
        }
        return date;
    }
};
DatesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Date')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DatesService);
exports.DatesService = DatesService;
//# sourceMappingURL=dates.service.js.map