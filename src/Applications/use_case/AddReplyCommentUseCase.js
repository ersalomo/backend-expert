const AddReply = require('../../Domains/reply_comments/entities/AddReply');

class AddPostReplayCommentUseCase {
  constructor({replyCommentRepository}) {
    this._replyCommentRepository = replyCommentRepository;
  }

  async execute(useCasePayload) {
    const addReply = new AddReply(useCasePayload);
    await this._replyCommentRepository.verifyThreadId(addReply.threadId); // and
    await this._replyCommentRepository.verifyCommentId(addReply.commentId); // and
    return this._replyCommentRepository.addReplyComment(addReply);
  }
}

module.exports = AddPostReplayCommentUseCase;
