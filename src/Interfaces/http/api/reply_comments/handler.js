const AddReplyCommentUseCase = require('../../../../Applications/use_case/AddReplyCommentUseCase');

class ReplyCommentHandler {
  constructor(container) {
    this._container = container;

    this.addPostReplayComment = this.addPostReplayComment.bind(this);
    this.deletePostReplayComment = this.deletePostReplayComment.bind(this);
  }

  async addPostReplayComment(req, h) {
    console.log(req.payload);
    const addReplyCommentUseCase = this._container.getInstance(AddReplyCommentUseCase.name);
    const addedReply = await addReplyCommentUseCase.execute(req.payload);

    return h.response({
      status: 'success',
      data: {addedReply},
    }).code(201);
  }

  async deletePostReplayComment(req, h) {
    const {replyId} = req.params;
    console.log(replyId);
    return h.response({
      status: 'success',
    }).code(200);
  }
}
module.exports = ReplyCommentHandler;
