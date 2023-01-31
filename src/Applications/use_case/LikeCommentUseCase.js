const AddLikeComment = require('../../Domains/likes/entities/AddLike');

module.exports = class LikeCommentUseCase {
  constructor({ likesRepository, commentsRepository }) {
    this._likesRepository = likesRepository;
    this._commentsRepository = commentsRepository;
  }

  async execute(useCasePayload) {
    const addLikeComment = new AddLikeComment(useCasePayload);
    await this._commentsRepository.verifyExistsCommentById(addLikeComment.idComment);
    const isLikedComment = await this._likesRepository.isLiked(addLikeComment);
    if (isLikedComment) {
      await this._likesRepository.deleteLikeComment(addLikeComment);
    } else {
      await this._likesRepository.likeComment(addLikeComment);
    }
  }
};
