const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');


describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      userId: 1,
      title: 'New Thread',
      body: 'new body dude',
      date: new Date().toDateString(),
    };
    const expectedAddedThread = new AddedThread({
      title: useCasePayload.title,
      body: useCasePayload.body,
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.veryfyUserId = jest.fn()
        .mockImplementation(() => Promise.resolve());
    mockThreadRepository.addThread = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedAddedThread));

    /** creating use case instance */
    const getThreadUseCase = new AddThreadUseCase({
      userRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await getThreadUseCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadRepository.veryfyUserId).toBeCalledWith(useCasePayload.userId);
    expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread({
      title: useCasePayload.title,
      body: useCasePayload.body,
    }));
  });
});

