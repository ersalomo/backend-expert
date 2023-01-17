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
const RegisterUser_1 = __importDefault(require("../../Domains/users/entities/RegisterUser"));
class AddUserUseCase {
    constructor(userRepository, passwordHash) {
        this.userRepository = userRepository;
        this.passwordHash = passwordHash;
    }
    execute(useCasePayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerUser = new RegisterUser_1.default(useCasePayload);
            yield this.userRepository.verifyAvailableUsername(registerUser.username);
            registerUser.password = yield this.passwordHash.hash(registerUser.password);
            return this.userRepository.addUser(registerUser);
        });
    }
}
exports.default = AddUserUseCase;
//# sourceMappingURL=AddUserUseCase.js.map