import ThreadRepository from '../../../Domains/threads/ThreadRepository';
import AddThreadUseCase from '../AddThreadUseCase';
import AddThread from '../../../Domains/threads/entities/AddThread';
import AddedThread from '../../../Domains/threads/entities/AddedThread';


describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      owner: 'user-123',
      title: 'New Thread',
      body: 'New body dude',
    };

    const expectedAddedThread = new AddedThread({
      id: 'thread-123',
      owner: useCasePayload.owner,
      title: useCasePayload.title,
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addThread = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedAddedThread));

    /** creating use case instance */
    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await getThreadUseCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread({
      owner: useCasePayload.owner,
      title: useCasePayload.title,
      body: useCasePayload.body,
    }));
  });
});

