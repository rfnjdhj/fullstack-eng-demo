"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        index: true,
    },
}, { timestamps: true });
todoSchema.index({ createdAt: -1 });
todoSchema.index({ updatedAt: -1 });
exports.default = (0, mongoose_1.model)('Todo', todoSchema);
