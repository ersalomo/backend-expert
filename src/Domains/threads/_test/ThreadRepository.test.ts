import ThreadRepository from '../ThreadRepository';

describe('ThreadRepository Interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arange
    class ThreadRepositoryPostgresTest extends ThreadRepository {
      async checkExistsThreadById(idThread: string): Promise<any> {
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }
      async addThread(registerthread: any): Promise<any> {
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }
      async getDetailThreadById(idThread: string): Promise<any> {
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
      }
      constructor() {
        super();
      }
      // async checkExistsThreadById({}):Promise<any> {}
      // async addThread({}) {}
      // async getDetailThreadById({}) {}
    }
    // const threadRepository = new ThreadRepository();
    const threadRepository = new ThreadRepositoryPostgresTest();
    // Action and Assert
    await expect(threadRepository.checkExistsThreadById('')).rejects.toThrowError(
        'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(threadRepository.addThread({})).rejects.toThrowError(
        'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(
        threadRepository.getDetailThreadById(''),
    ).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
