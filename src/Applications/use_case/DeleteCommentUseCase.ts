const DeleteComment = require('../../Domains/comments/entities/DeleteComment');

export default class DeleteCommentUseCase {
  constructor({commentRepository, threadRepository}) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const {commentId, threadId, owner} = new DeleteComment(useCasePayload);
    await this._threadRepository.checkExistsThreadById(threadId);
    await this._commentRepository.verifyExistsCommentById(commentId);
    return this._commentRepository.deleteComment({commentId, owner});
  }
}
