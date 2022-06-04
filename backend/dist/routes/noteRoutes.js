"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.route('/').get(auth_1.protect, noteController_1.getNotesNotArchived).post(auth_1.protect, noteController_1.postNote);
router.route('/categories').get(auth_1.protect, noteController_1.getCategories);
router.route('/archived').get(auth_1.protect, noteController_1.getNotesArchived);
router.route('/:id').put(auth_1.protect, noteController_1.putNote).delete(auth_1.protect, noteController_1.deleteNote);
exports.default = router;
//# sourceMappingURL=noteRoutes.js.map