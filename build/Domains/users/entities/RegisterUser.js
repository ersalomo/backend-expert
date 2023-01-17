"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterUser {
    constructor(params) {
        const { username, password, fullname } = params;
        if (!username || !password || !fullname) {
            throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof username !== 'string' ||
            typeof password !== 'string' ||
            typeof fullname !== 'string') {
            throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
        if (username.length > 50) {
            throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR');
        }
        // menggunakan /^[\w]+$/ (cara cepat untuk pola a-zA-Z1-9_).
        if (!username.match(/^[a-zA-Z1-9_]+$/)) {
            throw new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
        }
        this.username = username;
        this.password = password;
        this.fullname = fullname;
    }
}
exports.default = RegisterUser;
//# sourceMappingURL=RegisterUser.js.map