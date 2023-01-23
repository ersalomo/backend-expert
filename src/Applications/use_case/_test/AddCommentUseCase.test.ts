import AddedComment from '../../../Domains/comments/entities/AddedComment';
import AddComment from '../../../Domains/comments/entities/AddComment';
import AddCommentUseCase from '../AddCommentUseCase';
import CommentRepository from '../../../Domains/comments/CommentRepository';
import ThreadRepository from '../../../Domains/threads/ThreadRepository';

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

    const expectedAddedThread = new AddedComment({
      id: 'comment-123',
      content: 'Gak ada',
      owner: 'user-123',
    });
    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockCommentRepository.addComment = jest.fn(() =>
      Promise.resolve(expectedAddedThread),
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
    const addedThread = await addCommentUseCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(expectedAddedThread);
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
