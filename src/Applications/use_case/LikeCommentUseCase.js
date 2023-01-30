module.exports = class LikeCommentUseCase {
  constructor({ likesRepository, commentsRepository }) {
    this._likesRepository = likesRepository;
    this._commentsRepository = commentsRepository;
  }

  async execute(useCasePayload) {}
};
