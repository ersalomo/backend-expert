/* eslint-disable indent */
const LikesRepository = require('../../../Domains/likes/LikesRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const AddedLike = require('../../../Domains/likes/entities/AddedLike');
const LikeCommentUseCase = require('../LikeCommentUseCase');

describe('LikeCommentUseCase.test', () => {
  it('should orchestrating the add thread action correctly when  comment is not liked', async () => {
    // Arrange
    const useCasePayload = {
      idComment: 'comment-123',
      owner: 'user-123',
    };

    /** creating dependency of use case */
    const mockLikesRepository = new LikesRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockCommentRepository.verifyExistsCommentById = jest.fn(() => Promise.resolve());
    mockLikesRepository.isLiked = jest.fn(() => Promise.resolve(false));

    mockLikesRepository.likeComment = jest.fn().mockImplementation(() =>
      Promise.resolve(
        new AddedLike({
          id: 'like-123',
          id_comment: useCasePayload.idComment,
          owner: useCasePayload.owner,
        })
      )
    );
    /** creating use case instance */
    const getLikeUseCase = new LikeCommentUseCase({
      likesRepository: mockLikesRepository,
      commentsRepository: mockCommentRepository,
    });

    // Action
    const addedLike = await getLikeUseCase.execute(useCasePayload);

    // Assert
    expect(addedLike).toStrictEqual(
      new AddedLike({
        id: 'like-123',
        id_comment: useCasePayload.idComment,
        owner: useCasePayload.owner,
      })
    );
  });

  it('should orchestrating the add thread action correctly when  comment is liked', async () => {
    // Arrange
    const useCasePayload = {
      idComment: 'comment-123',
      owner: 'user-123',
    };

    /** creating dependency of use case */
    const mockLikesRepository = new LikesRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockCommentRepository.verifyExistsCommentById = jest.fn(() => Promise.resolve());
    mockLikesRepository.isLiked = jest.fn(() => Promise.resolve(true));

    mockLikesRepository.deleteLikeComment = jest.fn().mockImplementation(() =>
      Promise.resolve(
        new AddedLike({
          id: 'like-123',
          id_comment: useCasePayload.idComment,
          owner: useCasePayload.owner,
        })
      )
    );
    /** creating use case instance */
    const getLikeUseCase = new LikeCommentUseCase({
      likesRepository: mockLikesRepository,
      commentsRepository: mockCommentRepository,
    });

    // Action
    const addedLike = await getLikeUseCase.execute(useCasePayload);

    // Assert
    expect(addedLike).toStrictEqual(
      new AddedLike({
        id: 'like-123',
        id_comment: useCasePayload.idComment,
        owner: useCasePayload.owner,
      })
    );
  });
});
