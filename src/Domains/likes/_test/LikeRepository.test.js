const LikeRepository = require('../LikesRepository');
describe('LikeRepesitory interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const likeRepository = new LikeRepository();

    await expect(likeRepository.likeComment({})).rejects.toThrowError('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(likeRepository.isLiked({})).rejects.toThrowError('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(likeRepository.deleteLikeComment({})).rejects.toThrowError('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(likeRepository.getCountLikingByThreadId({})).rejects.toThrowError('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
