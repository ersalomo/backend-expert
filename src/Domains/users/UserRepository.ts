import RegisterUser from "./entities/RegisterUser";

interface UserRepository {
addUser(registerUser:RegisterUser):any;
 verifyAvailableUsername(username:string):any
}

export default UserRepository;

type x = () => {}


