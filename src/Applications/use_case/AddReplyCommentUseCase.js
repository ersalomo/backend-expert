const AddReply = require('../../Domains/reply_comments/entities/AddReply');

class AddPostReplayCommentUseCase {
  constructor({ replyCommentRepository, commentRepository, threadRepository }) {
    this._replyCommentRepository = replyCommentRepository;
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const addReply = new AddReply(useCasePayload);
    await this._threadRepository.checkExistsThreadById(useCasePayload.threadId);
    await this._commentRepository.verifyExistsCommentById(addReply.commentId);
    return this._replyCommentRepository.addReplyComment(addReply);
  }
}

module.exports = AddPostReplayCommentUseCase;
