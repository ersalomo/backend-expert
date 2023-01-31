const AddLikeComment = require('../../Domains/likes/entities/AddLike');

module.exports = class LikeCommentUseCase {
  constructor({ likesRepository, commentsRepository }) {
    this._likesRepository = likesRepository;
    this._commentsRepository = commentsRepository;
  }

  async execute(useCasePayload) {
    const addLikeComment = new AddLikeComment(useCasePayload);
    await this._commentsRepository.verifyExistsCommentById(addLikeComment.idComment);
    const { owner, idComment } = addLikeComment;
    const isLikedComment = await this._likesRepository.isLiked(owner, idComment);
    if (isLikedComment) {
      console.log('suda liked');
      return;
    }
    await this._likesRepository.addLikeComment(addLikeComment);
  }
};
