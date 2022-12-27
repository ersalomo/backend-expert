const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');

class CommentHandler {
  constructor(container) {
    this._container = container;
    this.postAddComment = this.postAddComment.bind(this);
  }

  async postAddComment(req, h) {
    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
    const comment = {
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
    const {threadId, commentId} = req.params;
    console.log(threadId, commentId);
  }
}

module.exports = CommentHandler;
