
class DeleteReplyCommentUseCase {
  constructor({replyCommentRepository, commentRepository}) {
    this._replyCommentRepository = replyCommentRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const {threadId, commentId, owner, replyId} = useCasePayload;
    // gimana kalo thread dan comment tidak ada tapi reply ada
    // await this._replyCommentRepository.verifyExistsCommentAndThreadByIds({threadId, commentId});
    await this._replyCommentRepository.verifyExistsReplyById(replyId);
    return this._replyCommentRepository.deleteReplyComment({replyId, owner});
  }
}


module.exports = DeleteReplyCommentUseCase;
