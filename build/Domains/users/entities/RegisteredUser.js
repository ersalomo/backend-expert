"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisteredUser {
    constructor(payload) {
        this.verifyPayload(payload);
        this.id = payload.id;
        this.username = payload.username;
        this.fullname = payload.fullname;
    }
    verifyPayload(payload) {
        Object.values(payload).forEach((attrValue) => {
            if (typeof attrValue !== 'string') {
                throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
            }
            if (!attrValue) {
                throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
            }
        });
    }
}
exports.default = RegisteredUser;
//# sourceMappingURL=RegisteredUser.js.map