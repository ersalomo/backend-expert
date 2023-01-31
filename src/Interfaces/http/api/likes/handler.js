const LikeCommentUseCase = require('../../../../Applications/use_case/LikeCommentUseCase');

module.exports = class LikeHandler {
  constructor(container) {
    this._container = container;
    this.likeComment = this.likeComment.bind(this);
  }

  async likeComment(req, h) {
    const { id: owner } = req.auth.credentials;
    const idComment = req.params.idComment;
    const likeCommentUseCase = this._container.getInstance(LikeCommentUseCase.name);
    await likeCommentUseCase.execute({ owner, idComment });
    return h.response({
      status: 'success',
    });
  }
};
