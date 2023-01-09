const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');


class CommentHandler {
  constructor(container) {
    this._container = container;
    this.postAddComment = this.postAddComment.bind(this);
    this.deleteCommentThread = this.deleteCommentThread.bind(this);
  }

  async postAddComment(req, h) {
    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
    const {id: owner} = req.auth.credentials;
    const comment = {
      owner: owner,
      threadId: req.params.threadId,
      content: req.payload.content,
    };
    const addedComment = await addCommentUseCase.execute(comment);

    return h.response({
      status: 'success',
      data: {
        addedComment,
      },
    }).code(201);
  }

  async deleteCommentThread(req, h) {
    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
    const {id: owner} = req.auth.credentials;
    const {threadId, commentId} = req.params;
    const useCasePayload = {
      owner,
      threadId,
      commentId,
    };
    await deleteCommentUseCase.execute(useCasePayload);

    return {
      status: 'success',
    };
  }
}

module.exports = CommentHandler;
