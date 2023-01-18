const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddCommentUseCase = require('../AddCommentUseCase');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('AddCommentUseCase', () => {
  /**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
     */
  it('should orchestrating the add comment action correctly', async () => {
  // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      content: 'Gak ada',
      owner: 'user-123',
    };

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockCommentRepository.addComment = jest.fn(() =>
      Promise.resolve(new AddedComment({
        id: 'comment-123',
        content: 'Gak ada',
        owner: 'user-123',
      })),
    );
    mockThreadRepository.checkExistsThreadById = jest.fn(() =>
      Promise.resolve(),
    );

    /** creating use case instance */
    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });
    // Action
    const addedComment = await addCommentUseCase.execute(useCasePayload);

    // Assert
    expect(addedComment).toStrictEqual(new AddedComment({
      id: 'comment-123',
      content: 'Gak ada',
      owner: 'user-123',
    }));
    expect(mockCommentRepository.addComment).toBeCalledWith(
        new AddComment({
          threadId: 'thread-123',
          content: 'Gak ada',
          owner: 'user-123',
        }),
    );
    expect(mockThreadRepository.checkExistsThreadById).toBeCalledWith(
        'thread-123',
    );
  });
});
