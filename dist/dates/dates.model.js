"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.DateSchema = new mongoose.Schema({
    timeArrive: { type: String, required: true },
    timeDeparture: { type: String, required: true },
    day: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    cpf: { type: String, required: true },
});
//# sourceMappingURL=dates.model.js.map