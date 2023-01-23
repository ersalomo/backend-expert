import ReplyCommentRepository from '../../../Domains/reply_comments/ReplyCommentRepository';
import CommentRepository from '../../../Domains/comments/CommentRepository';
import DeleteReplyUseCase from '../DeleteReplyCommentUseCase';

describe('DeleteReplyUseCase', () => {
/**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
*/
  it('should orchestrating the delete reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      commentId: 'comment-123',
      replyId: 'reply-123',
      owner: 'user-123',
    };

    /** creating dependency of use case */
    const mockReplyRepository = new ReplyCommentRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockReplyRepository.verifyExistsCommentAndThreadByIds = jest.fn(() => Promise.resolve());
    mockReplyRepository.verifyExistsReplyById = jest.fn(() => Promise.resolve());
    mockReplyRepository.deleteReplyComment = jest.fn(() => Promise.resolve());

    /** creating use case instance */
    const deleteReplyUseCase = new DeleteReplyUseCase({
      replyCommentRepository: mockReplyRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    await deleteReplyUseCase.execute(useCasePayload);

    // Assert
    expect(mockReplyRepository.deleteReplyComment).toBeCalledWith(
        {
          // commentId: 'comment-123',
          replyId: 'reply-123',
          owner: 'user-123',
        },
    );
    expect(mockReplyRepository.verifyExistsReplyById).toBeCalledWith(
        useCasePayload.replyId,
    );
  });
});
