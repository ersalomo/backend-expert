import RegisterUser from "../../Domains/users/entities/RegisterUser";
import UserRepository from "../../Domains/users/UserRepository";

export default class AddUserUseCase {
    constructor(private userRepository:UserRepository,private passwordHash:PasswordHash) {}

    async execute(useCasePayload:any) {
        const registerUser = new RegisterUser(useCasePayload);
        await this.userRepository.verifyAvailableUsername(registerUser.username);
        registerUser.password = await this.passwordHash.hash(registerUser.password);
        return this.userRepository.addUser(registerUser);
    }
}