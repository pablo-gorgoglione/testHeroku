"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error({
        message: `${err.message}`,
        req_url: req.path.toString(),
        fullError: err,
    });
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
    return;
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map