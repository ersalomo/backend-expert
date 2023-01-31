const LikesRepository = require('../../../Domains/likes/LikesRepository');
const AddedLike = require('../../../Domains/likes/entities/AddedLike');
const LikeCommentUseCase = require('../LikeCommentUseCase');

describe('LikeCommentUseCase.test', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      idComment: 'comment-123',
      owner: 'user-123',
    };

    /** creating dependency of use case */
    const mockLikesRepository = new LikesRepository();

    /** mocking needed function */
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
      likesRepository: '',
      commentsRepository: '',
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
