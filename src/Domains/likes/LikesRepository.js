module.exports = class LikesRepository {
  async likeComment(addLikeComment) {
    throw new Error('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async deleteLikeComment({ owner, idComment }) {
    throw new Error('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async isLiked({ owner, idComment }) {
    throw new Error('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async getCountLikingByThreadId({ threadId }) {
    throw new Error('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
};
