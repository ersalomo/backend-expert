module.exports = class UnLikeCommentUseCase {
  constructor({ likesRepository, commentsRepository }) {
    this._likeRepository = likesRepository;
    this._commentsRepository = commentsRepository;
  }
  async execute(useCasePayload) {
    const { idLike, idComment, owner } = useCasePayload;
    await this._likeRepository.checkLikeExistsById(idLike);
    await this._commentsRepository.verifyExistsCommentById(idComment);
    await this._likeRepository.unLikeComment(owner, idLike);
  }
};
