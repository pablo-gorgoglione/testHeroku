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
const mongoose_1 = __importDefault(require("mongoose"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const noteModel_1 = __importDefault(require("../models/noteModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const seedCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    let mongoDB = 'mongodb://localhost:27017/ensolvers_dev';
    try {
        yield mongoose_1.default.connect(mongoDB);
        yield Promise.all([
            noteModel_1.default.deleteMany(),
            userModel_1.default.deleteMany(),
            categoryModel_1.default.deleteMany(),
        ]);
        yield Promise.all([
            categoryModel_1.default.create({ name: 'Job' }),
            categoryModel_1.default.create({ name: 'Personal' }),
            categoryModel_1.default.create({ name: 'Important' }),
        ]);
        console.log('Seeded production db');
    }
    catch (error) {
        console.log(error);
    }
});
seedCategory().then(() => {
    mongoose_1.default.disconnect();
    process.exit(0);
});
//# sourceMappingURL=seed.js.map