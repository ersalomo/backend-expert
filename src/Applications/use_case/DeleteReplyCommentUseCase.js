
class DeleteReplyCommentUseCase {
  constructor({replyCommentRepository}) {
    this._replyCommentRepository = replyCommentRepository;
  }

  async execute(useCasePayload) {
    const {threadId, commentId, owner, replyId} = useCasePayload;
    console.log(owner, 'DeleteReplyCommentUseCase');
    await this._replyCommentRepository.verifyThreadId(threadId);
    await this._replyCommentRepository.verifyCommentId(commentId);
    await this._replyCommentRepository.verifyReply(replyId);
    await this._replyCommentRepository.verifyOwner(owner, replyId);
    return this._replyCommentRepository.deleteReplyComment(replyId);
  }
}


module.exports = DeleteReplyCommentUseCase;
