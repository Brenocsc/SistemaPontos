"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.PointSchema = new mongoose.Schema({
    timeArrive: { type: Date, required: true },
    timeDeparture: { type: Date, required: false },
    cpf: { type: String, required: true },
});
//# sourceMappingURL=points.model.js.map