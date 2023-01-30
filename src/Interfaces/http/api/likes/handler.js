const LikeCommentUseCase = require('../../../../Applications/use_case/LikeCommentUseCase');
const UnLikeCommentUseCase = require('../../../../Applications/use_case/UnLikeCommentUseCase');

module.exports = class LikeHandler {
  constructor(container) {
    this._container = container;
    this.postLike = this.postLike.bind(this);
    this.postLike = this.postLike.bind(this);
  }

  async postLike(req, h) {
    const { id: owner } = req.auth.credentials;
    const idComment = req.params.idComment;
    const likeCommentUseCase = this._container.getInstance(LikeCommentUseCase);
    await likeCommentUseCase.execute({ owner, idComment });

    return h.response({
      status: 'success',
    });
  }
  async putLike(res, req) {
    const { id: owner } = req.auth.credentials;
    const idComment = req.params.idComment;
    const unLikeCommentUseCase = this._container.getInstance(UnLikeCommentUseCase);
    await unLikeCommentUseCase.execute({ owner, idComment });
  }
};
