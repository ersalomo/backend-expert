const AddReplyCommentUseCase = require('../../../../Applications/use_case/AddReplyCommentUseCase');
const DeleteReplyCommentUseCase = require('../../../../Applications/use_case/DeleteReplyCommentUseCase');

class ReplyCommentHandler {
  constructor(container) {
    this._container = container;

    this.addPostReplayComment = this.addPostReplayComment.bind(this);
    this.deletePostReplayComment = this.deletePostReplayComment.bind(this);
  }

  async addPostReplayComment(req, h) {
    const addReplyCommentUseCase = this._container.getInstance(AddReplyCommentUseCase.name);
    const {threadId, commentId} = req.params;
    const {id: owner} = req.auth.credentials;
    const {content} = req.payload;
    const useCasePayload = {
      threadId, commentId, owner,
      content,
    };
    const addedReply = await addReplyCommentUseCase.execute(useCasePayload);

    return h.response({
      status: 'success',
      data: {addedReply},
    }).code(201);
  }

  async deletePostReplayComment(req, h) {
    const deleteReplyCommentUseCase = this._container.getInstance(DeleteReplyCommentUseCase.name);
    const {id: owner}= req.auth.credentials;
    req.params.owner = owner;
    await deleteReplyCommentUseCase.execute(req.params);
    return h.response({
      status: 'success',
    }).code(200);
  }
}
module.exports = ReplyCommentHandler;
