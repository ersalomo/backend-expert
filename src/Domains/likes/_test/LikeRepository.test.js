const LikeRepository = require('../LikesRepository');
describe('LikeRepesitory interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const likeRepository = new LikeRepository();

    await expect(likeRepository.checkLikeExistsById('')).rejects.toThrowError('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(likeRepository.addLikeComment({})).rejects.toThrowError('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(likeRepository.isLiked('', '')).rejects.toThrowError('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(likeRepository.unLikeComment('', '')).rejects.toThrowError('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
