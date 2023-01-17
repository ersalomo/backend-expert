"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = 400;
        if (this.constructor.name === 'ClientError') {
            throw new Error('cannot instantiate abstract class');
        }
        this.statusCode = statusCode;
        this.name = 'ClientError';
    }
}
exports.default = ClientError;
//# sourceMappingURL=ClientError.js.map