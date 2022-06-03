"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NoteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
    archived: { type: Boolean, require: true, default: false },
}, { timestamps: true });
const Note = (0, mongoose_1.model)('Note', NoteSchema);
exports.default = Note;
//# sourceMappingURL=noteModel.js.map