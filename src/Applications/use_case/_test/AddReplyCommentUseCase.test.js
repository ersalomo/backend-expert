const AddReplyCommentUseCase = require('../AddReplyCommentUseCase');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ReplyCommentRepository = require('../../../Domains/reply_comments/ReplyCommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddedReply = require('../../../Domains/reply_comments/entities/AddedReply');
const AddReply = require('../../../Domains/reply_comments/entities/AddReply');

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

    /** creating dependency of use case */
    const mockReplyRepository = new ReplyCommentRepository();
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockReplyRepository.addReplyComment = jest.fn(() =>
      Promise.resolve(
        new AddedReply({
          id: 'reply-123',
          content: 'Tentang cerita dulu',
          owner: 'user-123',
        })
      )
    );
    mockThreadRepository.checkExistsThreadById = jest.fn(() => Promise.resolve(useCasePayload.threadId));
    mockCommentRepository.verifyExistsCommentById = jest.fn(() => Promise.resolve(useCasePayload.commentId));

    /** creating use case instance */
    const addReplyUseCase = new AddReplyCommentUseCase({
      replyCommentRepository: mockReplyRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await addReplyUseCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(
      new AddedReply({
        id: 'reply-123',
        content: 'Tentang cerita dulu',
        owner: 'user-123',
      })
    );
    expect(mockReplyRepository.addReplyComment).toBeCalledWith(
      new AddReply({
        commentId: 'comment-123',
        content: 'Tentang cerita dulu',
        owner: 'user-123',
      })
    );
    expect(mockCommentRepository.verifyExistsCommentById).toBeCalledWith(useCasePayload.commentId);
  });
});
