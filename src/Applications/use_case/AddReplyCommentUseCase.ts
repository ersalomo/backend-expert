const AddReply = require('../../Domains/reply_comments/entities/AddReply');

export default class AddPostReplayCommentUseCase {
  constructor({replyCommentRepository, commentRepository}) {
    this._replyCommentRepository = replyCommentRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const addReply = new AddReply(useCasePayload);
    await this._commentRepository.verifyExistsCommentById(addReply.commentId);
    return this._replyCommentRepository.addReplyComment(addReply);
  }
}

