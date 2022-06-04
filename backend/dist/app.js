"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const db_1 = __importDefault(require("./utils/db"));
const errorHandler_1 = require("./middlewares/errorHandler");
exports.app = (0, express_1.default)();
dotenv_1.default.config();
exports.app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
}));
(0, db_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use('/api', indexRoutes_1.default);
if (process.env.NODE_ENV === 'production') {
    exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/build')));
    exports.app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, '../../frontend', 'build', 'index.html'));
    });
}
exports.app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});
exports.app.use(errorHandler_1.errorHandler);
const port = process.env.PORT || 4000;
exports.app.listen(port, () => {
    console.log(`API is running on port: ${port}`);
});
//# sourceMappingURL=app.js.map