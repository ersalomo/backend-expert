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
const handler_1 = __importDefault(require("./handler"));
const routes_1 = require("./routes");
module.exports = {
    name: 'users',
    register: (server, params) => __awaiter(void 0, void 0, void 0, function* () {
        const usersHandler = new handler_1.default(params.container);
        server.route((0, routes_1.routes)(usersHandler));
    }),
};
//# sourceMappingURL=index.js.map