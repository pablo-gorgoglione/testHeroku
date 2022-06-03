"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.default.Router();
router.route('/').get(categoryController_1.getCategories);
router.route('/seed').get(categoryController_1.seedCategory);
exports.default = router;
//# sourceMappingURL=categoryRoutes.js.map