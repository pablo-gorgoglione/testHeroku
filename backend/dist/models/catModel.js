"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
const Category = (0, mongoose_1.model)('Category', CategorySchema);
exports.default = Category;
//# sourceMappingURL=catModel.js.map