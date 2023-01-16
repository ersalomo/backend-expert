const CommentRepository = require('../../../Domains/comments/CommentRepository');
const AddedReply = require('../../../Domains/reply_comments/entities/AddedReply');
const AddReply = require('../../../Domains/reply_comments/entities/AddReply');
const ReplyCommentRepository = require('../../../Domains/reply_comments/ReplyCommentRepository');
const AddReplyCommentUseCase = require('../AddReplyCommentUseCase');

describe('AddReplyCommentUseCase', () => {
/**
 * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
 */
  it('should orchestrating the add reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      content: 'Tentang cerita dulu',
      owner: 'user-123',
    };

    const expectedAddedReply = new AddedReply({
      id: 'reply-123',
      content: 'Tentang cerita dulu',
      owner: 'user-123',
    });

    /** creating dependency of use case */
    const mockReplyRepository = new ReplyCommentRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockReplyRepository.addReplyComment = jest.fn(() =>
      Promise.resolve(expectedAddedReply),
    );
    mockCommentRepository.verifyExistsCommentById = jest.fn(() =>
      Promise.resolve(useCasePayload.commentId),
    );

    /** creating use case instance */
    const addReplyUseCase = new AddReplyCommentUseCase({
      replyCommentRepository: mockReplyRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const addedThread = await addReplyUseCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(expectedAddedReply);
    expect(mockReplyRepository.addReplyComment).toBeCalledWith(
        new AddReply({
          commentId: 'comment-123',
          content: 'Tentang cerita dulu',
          owner: 'user-123',
        }),
    );
    // expect(mockCommentRepository.verifyExistsCommentById).toBeCalledWith(
    //     useCasePayload,
    // );
  });
});
