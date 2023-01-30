module.exports = class UnLikeCommentUseCase {
  constructor({ likesRepository, commentsRepository }) {
    this._likeRepository = likesRepository;
    this._commentsRepository = commentsRepository;
  }
  async execute(useCasePayload) {}
};
