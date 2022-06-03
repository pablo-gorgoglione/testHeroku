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
exports.seedCategory = exports.deleteCategory = exports.postCategory = exports.getCategories = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const catModel_1 = __importDefault(require("../models/catModel"));
// @route GET /category/
exports.getCategories = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = catModel_1.default.find({});
    res.json(categories);
}));
// @route POST /category/
exports.postCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        throw new Error('A name is required for the category.');
    }
    const category = yield catModel_1.default.create({ name });
    res.status(201).json(category.toJSON());
}));
// @route DELETE /category/
exports.deleteCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        throw new Error('Missing post id');
    }
    const category = yield catModel_1.default.findById(id);
    if (!category) {
        throw new Error('Not category found, invalid');
    }
    yield category.delete();
    res.json({ message: 'Category deleted.' });
}));
// @route GET /category/seed
exports.seedCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield catModel_1.default.deleteMany();
    yield Promise.all([
        catModel_1.default.create({ name: 'Personal' }),
        catModel_1.default.create({ name: 'Job' }),
        catModel_1.default.create({ name: 'Ideas' }),
        catModel_1.default.create({ name: 'Extras' }),
    ]);
    console.log('Date loaded');
    res.json({ message: 'Category loaded.' });
}));
//# sourceMappingURL=categoryController.js.map