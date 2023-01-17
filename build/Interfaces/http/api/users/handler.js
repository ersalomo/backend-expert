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
Object.defineProperty(exports, "__esModule", { value: true });
const AddUserUseCase_1 = __importDefault(require("../../../../Applications/use_case/AddUserUseCase"));
class UserHandler {
    constructor(container) {
        this.container = container;
    }
    postUserHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const addUserUseCase = this.container.getInstance(AddUserUseCase_1.default.name);
            const addedUser = yield addUserUseCase.execute(request.payload);
            const response = h.response({
                status: 'success',
                data: {
                    addedUser,
                },
            });
            response.code(201);
            return response;
        });
    }
}
exports.default = UserHandler;
//# sourceMappingURL=handler.js.map