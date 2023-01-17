import DeleteComment from '../../Domains/comments/entities/DeleteComment';
import CommentRepository from '../../Domains/comments/CommentRepository';
import ThreadRepository from '../../Domains/threads/ThreadRepository';

export default class DeleteCommentUseCase {
  constructor(
    private _commentRepository: CommentRepository,
    private _threadRepository: ThreadRepository,
  ) {}

  async execute(useCasePayload:DeleteComment) {
    const {commentId, threadId, owner} = new DeleteComment(useCasePayload);
    await this._threadRepository.checkExistsThreadById(threadId);
    await this._commentRepository.verifyExistsCommentById(commentId);
    return this._commentRepository.deleteComment({commentId, owner});
  }
}
