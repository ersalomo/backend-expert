const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');

class CommentHandler {
  constructor(container) {
    this._container = container;

    this.postAddComment = this.postAddComment.bind(this);
  }

  async postAddComment(request, h) {
    const addCommentUseCase = this._container.getIntance(AddCommentUseCase.name);
    const addComment = await addCommentUseCase.execute(request.payload);

    return h.response({
      status: 'success',
      data: {
        addComment,
      },
    }).code(201);
  }
}

module.exports = CommentHandler;
