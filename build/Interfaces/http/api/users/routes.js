"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const routes = (handler) => ([
    {
        method: 'post',
        path: '/users',
        handler: handler.postUserHandler,
    },
]);
exports.routes = routes;
//# sourceMappingURL=routes.js.map