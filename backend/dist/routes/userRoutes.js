"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.route('/').post(userController_1.register).get(auth_1.protect, userController_1.getUser);
router.route('/login').post(userController_1.login);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map