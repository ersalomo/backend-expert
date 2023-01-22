import RegisterUser from './entities/RegisterUser';
// import RegisteredUser from './entities/RegisteredUser';

export default abstract class UserRepository {
  abstract addUser(registerUser: RegisterUser): Promise<any>;
  abstract verifyAvailableUsername(username:string):Promise<void>;
  abstract getIdByUsername(username:string):Promise<{}>
  abstract getPasswordByUsername(username:string):Promise<string>
}
