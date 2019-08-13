"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.PointSchema = new mongoose.Schema({
    timeArrive: { type: String, required: true },
    timeDeparture: { type: String, required: false },
    cpf: { type: String, required: true },
});
//# sourceMappingURL=points.model.js.map