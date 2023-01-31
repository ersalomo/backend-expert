const LikeCommentUseCase = require('../../../../Applications/use_case/LikeCommentUseCase');
const UnLikeCommentUseCase = require('../../../../Applications/use_case/UnLikeCommentUseCase');

module.exports = class LikeHandler {
  constructor(container) {
    this._container = container;
    this.postToAddLike = this.postToAddLike.bind(this);
    this.putToUnLike = this.putToUnLike.bind(this);
  }

  async postToAddLike(req, h) {
    const { id: owner } = req.auth.credentials;
    const idComment = req.params.idComment;
    const likeCommentUseCase = this._container.getInstance(LikeCommentUseCase.name);
    await likeCommentUseCase.execute({ owner, idComment });
    return h.response({
      status: 'success',
    });
  }
  async putToUnLike(req, h) {
    const { id: owner } = req.auth.credentials;
    const { idComment, idLike } = req.params;
    const unLikeCommentUseCase = this._container.getInstance(UnLikeCommentUseCase.name);
    await unLikeCommentUseCase.execute({ owner, idComment, idLike });
    return h.response({
      status: 'success',
    });
  }
};
