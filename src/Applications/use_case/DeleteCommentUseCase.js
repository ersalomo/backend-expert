
class DeleteCommentUseCase {
  constructor({commentRepository}) {
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const {commentId, threadId} = useCasePayload;
    await this._commentRepository.verifyThreadId(threadId);
    await this._commentRepository.verifyCommentId(commentId);
    return this._commentRepository.deleteComment(commentId);
  }
  _validatePayload(payload) {}
}

module.exports = DeleteCommentUseCase;
