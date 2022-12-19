import RegisterUser from './entities/RegisterUser';

export default interface UserRepository {
 addUser(registerUser:RegisterUser):any,
 verifyAvailableUsername(username:string):any,
}
