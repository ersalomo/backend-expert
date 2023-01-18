const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  /**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
     */
  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      owner: 'user-123',
    };

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.checkExistsThreadById = jest.fn(() =>
      Promise.resolve(),
    );
    mockCommentRepository.verifyExistsCommentById = jest.fn(() =>
      Promise.resolve(),
    );
    mockCommentRepository.deleteComment = jest.fn(() =>
      Promise.resolve(),
    );

    /** creating use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    await deleteCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.checkExistsThreadById).toBeCalledWith(
        useCasePayload.threadId,
    );
    expect(mockCommentRepository.verifyExistsCommentById).toBeCalledWith(
        useCasePayload.commentId,
    );
    expect(mockCommentRepository.deleteComment).toBeCalledWith({
      commentId: 'comment-123',
      owner: 'user-123',
    });
  });
});
