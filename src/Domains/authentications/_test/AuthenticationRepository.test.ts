import AuthenticationRepository from '../AuthenticationRepository';

describe('AuthenticationRepository interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    class AuthenticationRepositoryPostgresTest extends AuthenticationRepository {
      // constructor() {
      //   super();
      // }
      async addToken(token: string): Promise<void> {
        throw new Error('Method not implemented.');
      }
      async checkAvailabilityToken(token: string): Promise<void> {
        throw new Error('Method not implemented.');
      }
      async deleteToken(token: string): Promise<void> {
        throw new Error('Method not implemented.');
      }
    }
    const authenticationRepository = new AuthenticationRepositoryPostgresTest();

    // Action & Assert
    await expect(authenticationRepository.addToken('')).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationRepository.checkAvailabilityToken('')).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationRepository.deleteToken('')).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
