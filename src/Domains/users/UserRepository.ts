import RegisterUser from './entities/RegisterUser';

export default interface UserRepository {
 addUser(registerUser:RegisterUser):any
 verifyAvailableUsername(username:string):any
 getIdByUsername(username:string):any
 getPasswordByUsername(username:string):any
    // throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
}
