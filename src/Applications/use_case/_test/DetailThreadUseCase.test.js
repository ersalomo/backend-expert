const CommentRepository = require('../../../Domains/comments/CommentRepository');
const CommentDetail = require('../../../Domains/comments/entities/CommentDetail');
const ReplyDetail = require('../../../Domains/reply_comments/entities/ReplyDetail');
const ReplyCommentRepository = require('../../../Domains/reply_comments/ReplyCommentRepository');
const ThreadDetail = require('../../../Domains/threads/entities/ThreadDetail');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DetailThreadUseCase = require('../DetailThreadUseCase');

describe('DetailThreadUseCase', () => {
  /**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
  */
  it('should orchestrating the get thread details action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
    };

    const expectedThreadDetails = new ThreadDetail({
      id: 'thread-123',
      title: 'Di atas Awan',
      body: 'Ku ingin terbang',
      date: new Date('2021-08-08T07:19:09.775Z'),
      username: 'dicoding',
      comments: [
        new CommentDetail({
          id: 'comment-123',
          content: 'Tentang cerita dulu',
          date: new Date('2021-08-08T07:19:09.775Z'),
          username: 'dicoding',
          is_deleted: false,
          replies: [
            new ReplyDetail({
              id: 'reply-123',
              content: 'Hai, apa kabar',
              date: new Date('2021-08-08T07:19:09.775Z'),
              username: 'dicoding',
              is_deleted: true,
            }),
          ],
        }),
        new CommentDetail({
          id: 'comment-124',
          content: 'Tentang cerita dulu',
          date: new Date('2021-08-08T07:19:09.775Z'),
          username: 'dicoding',
          is_deleted: true,
          replies: [
            new ReplyDetail({
              id: 'reply-124',
              content: 'Hai, apa kabar',
              date: new Date('2021-08-08T07:19:09.775Z'),
              username: 'dicoding',
              is_deleted: false,
            }),
          ],
        }),
      ],
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyCommentRepository();
    // const mockLikeRepository = new LikeRepository();

    /** mocking needed function */
    mockThreadRepository.checkExistsThreadById = jest.fn(() =>
      Promise.resolve(),
    );
    mockThreadRepository.getDetailThreadById = jest.fn(() =>
      Promise.resolve({
        id: 'thread-123',
        title: 'Di atas Awan',
        body: 'Ku ingin terbang',
        date: new Date('2021-08-08T07:19:09.775Z'),
        username: 'dicoding',
      }),
    );

    mockCommentRepository.getCommentsByThreadId = jest.fn(() =>
      Promise.resolve([
        {
          id: 'comment-123',
          thread_id: 'thread-123',
          content: 'Tentang cerita dulu',
          date: new Date('2021-08-08T07:19:09.775Z'),
          username: 'dicoding',
          is_deleted: false,
        },
        {
          id: 'comment-124',
          thread_id: 'thread-123',
          content: 'Tentang cerita dulu',
          date: new Date('2021-08-08T07:19:09.775Z'),
          username: 'dicoding',
          is_deleted: true,
        },
      ]),
    );

    mockReplyRepository.getRepliesByThreadId = jest.fn(() =>
      Promise.resolve([
        {
          id: 'reply-123',
          id_comment: 'comment-123',
          content: 'Hai, apa kabar',
          date: new Date('2021-08-08T07:19:09.775Z'),
          username: 'dicoding',
          is_deleted: true,
        },
        {
          id: 'reply-124',
          id_comment: 'comment-124',
          content: 'Hai, apa kabar',
          date: new Date('2021-08-08T07:19:09.775Z'),
          username: 'dicoding',
          is_deleted: false,
        },
      ]),
    );

    /** creating use case instance */
    const getThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyCommentRepository: mockReplyRepository,
    });

    // Action
    const threadDetails = await getThreadUseCase.execute(useCasePayload.threadId);

    // Assert
    expect(threadDetails).toStrictEqual(expectedThreadDetails);
    expect(mockThreadRepository.getDetailThreadById).toBeCalledWith('thread-123');
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith('thread-123');
    expect(mockReplyRepository.getRepliesByThreadId).toBeCalledWith('thread-123');
  });
});
