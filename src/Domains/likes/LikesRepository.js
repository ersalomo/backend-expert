module.exports = class LikesRepository {
  async addLikeComment(addLikeComment) {
    throw new Error('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async unLikeComment(owner, idLike) {
    throw new Error('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async checkLikeExistsById(idLike) {
    throw new Error('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async isLiked(owner, idComment) {
    throw new Error('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
};
