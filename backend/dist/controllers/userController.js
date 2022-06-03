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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUser = exports.getUser = exports.login = exports.register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// @route POST /users/
// @acess Public
exports.register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password: pw } = req.body;
    const inUse = yield userModel_1.default.findOne({ username });
    if (inUse) {
        throw new Error('Username already in use.');
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashPassword = yield bcryptjs_1.default.hash(pw, salt);
    const user = yield userModel_1.default.create({
        username,
        password: hashPassword,
    });
    const _a = user.toJSON(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
    res.status(201).json(userWithoutPassword);
    return;
}));
// @route POST /users/login
// @acess Public
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield userModel_1.default.findOne({ username });
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        const userToSend = {
            id: user._id,
            username: user.username,
            token: (0, generateToken_1.default)(user.id),
        };
        res.status(200).json(userToSend);
        return;
    }
    res.status(401);
    throw new Error('Invalid username or password');
}));
// @route GET /api/users/
// @acess Private
exports.getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.searchUser)(req);
    res.json({ username: user.username, id: user.id });
    return;
}));
// @desc Return an User or throws an error for invalid id
const searchUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user ? req.user.id : '';
    if (!userId) {
        throw new Error('Missing or invalid token');
    }
    let user = yield userModel_1.default.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
exports.searchUser = searchUser;
//# sourceMappingURL=userController.js.map