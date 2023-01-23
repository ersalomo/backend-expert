const ThreadRepository = require('../ThreadRepository');

describe('ThreadRepository Interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arange
    const threadRepository = new ThreadRepository();
    // Action and Assert
    await expect(threadRepository.checkExistsThreadById()).rejects.toThrowError(
        'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(threadRepository.addThread({})).rejects.toThrowError(
        'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(
        threadRepository.getDetailThreadById({}),
    ).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
