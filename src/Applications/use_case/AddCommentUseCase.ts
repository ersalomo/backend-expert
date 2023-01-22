import AddComment from '../../Domains/comments/entities/AddComment';
import CommentRepository from '../../Domains/comments/CommentRepository';
import ThreadRepository from '../../Domains/threads/ThreadRepository';

export default class AddCommentUseCase {
  constructor(
    private _commentRepository: CommentRepository,
    private _threadRepository: ThreadRepository) {}

  async execute(useCasePayload:{owner: string, content: string, threadId: string,}) {
    const addComment = new AddComment(useCasePayload);
    await this._threadRepository.checkExistsThreadById(addComment.threadId);
    return this._commentRepository.addComment(addComment);
  }
}
