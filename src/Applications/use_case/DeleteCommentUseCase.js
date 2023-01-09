
class DeleteCommentUseCase {
  constructor({commentRepository}) {
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const {commentId, threadId, owner} = useCasePayload;
    await this._commentRepository.verifyThreadId(threadId);
    await this._commentRepository.verifyCommentId(commentId);
    await this._commentRepository.verifyOwner(owner, commentId);
    return this._commentRepository.deleteComment(commentId);
  }

  _validatePayload(payload) {}
}

module.exports = DeleteCommentUseCase;
