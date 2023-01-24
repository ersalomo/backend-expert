import UserRepository from '../UserRepository';
import RegisterUser from '../entities/RegisterUser';

describe('UserRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    class UserRepositoryPostgresTest extends UserRepository {
      addUser(registerUser: RegisterUser): Promise<any> {
        throw new Error('Method not implemented.');
      }
      verifyAvailableUsername(username: string): Promise<void> {
        throw new Error('Method not implemented.');
      }
      getIdByUsername(username: string): Promise<{}> {
        throw new Error('Method not implemented.');
      }
      getPasswordByUsername(username: string): Promise<string> {
        throw new Error('Method not implemented.');
      }
    }
    const userRepository = new UserRepositoryPostgresTest();

    // Action and Assert
    await expect(userRepository.addUser({} as RegisterUser )).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.verifyAvailableUsername('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.getIdByUsername('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.getPasswordByUsername('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
