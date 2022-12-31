const AddReply = require('../../Domains/replay_comments/entities/AddReply');

class AddPostReplayCommentUseCase {
  constructor({replyCommentRepository}) {
    this._replyCommentRepository = replyCommentRepository;
  }

  async execute(useCasePayload) {
    console.log(useCasePayload.content);
    const addReply = new AddReply(useCasePayload);
    console.log('payload usecase', addReply);
    return this._replyCommentRepository.addReplyComment(addReply);
  }
}

module.exports = AddPostReplayCommentUseCase;
