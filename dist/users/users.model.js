"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String, required: true },
    pod: { type: String, required: true },
    telefone: { type: String, required: true },
});
//# sourceMappingURL=users.model.js.map