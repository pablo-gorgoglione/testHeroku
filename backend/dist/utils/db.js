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
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(process.env.DB_DEV);
        console.log(process.env.NODE_ENV);
        let mongoDB = process.env.NODE_ENV == 'dev'
            ? process.env.DB_DEV
            : process.env.DB_PRO;
        process.env.NODE_ENV == 'dev'
            ? console.log('Using dev db')
            : console.log('Using production db');
        yield mongoose_1.default.connect(mongoDB);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = connectDb;
//# sourceMappingURL=db.js.map