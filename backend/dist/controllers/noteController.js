"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.putNote = exports.postNote = exports.getNotesArchived = exports.getNotesNotArchived = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const noteModel_1 = __importDefault(require("../models/noteModel"));
// @route GET /notes/
exports.getNotesNotArchived = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield noteModel_1.default.find({ archived: false })
        .populate({
        path: 'categories',
        select: 'name',
    })
        .sort({
        updatedAt: 'desc',
    });
    res.json(notes);
    return;
}));
// @route GET /notes/archived
exports.getNotesArchived = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = noteModel_1.default.find({ archived: true });
    res.json(notes);
    return;
}));
// @route POST /notes/
exports.postNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, categories } = req.body;
    valiteNoteBody(req);
    const note = yield noteModel_1.default.create({ title, content, categories });
    res.status(201).json(note.toJSON());
    return;
}));
// @route PUT /notes/:id
exports.putNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, categories } = req.body;
    valiteNoteBody(req);
    const note = yield validateExistence(req.params.id);
    note.title = title ? title : note.title;
    note.content = content ? content : note.content;
    note.categories = categories ? categories : note.categories;
    yield note.save();
    res.json(note);
    return;
}));
// @route DELETE /notes/:id
exports.deleteNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield validateExistence(req.params.id);
    yield note.delete();
    res.json({ message: 'Note deleted.' });
    return;
}));
// @desc Validates the data from the body
const valiteNoteBody = (req) => {
    const { title, content, categories } = req.body;
    if (!title) {
        throw new Error('A title is requiered.');
    }
    // if (!categories) {
    //   throw new Error('At least one category is requiered.');
    // }
    if (!content) {
        throw new Error('A content is requiered.');
    }
};
// @desc Validates that one note exist with the id passed
const validateExistence = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new Error('Missing post id');
    }
    const note = yield noteModel_1.default.findById(id);
    if (!note) {
        throw new Error('Not note found, invalid');
    }
    return note;
});
//# sourceMappingURL=noteController.js.map