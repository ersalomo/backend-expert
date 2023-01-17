
import AddComment from '../../Domains/comments/entities/AddComment';

export default class AddCommentUseCase {
  constructor({commentRepository, threadRepository}) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const addComment = new AddComment(useCasePayload);
    await this._threadRepository.checkExistsThreadById(addComment.threadId);
    return this._commentRepository.addComment(addComment);
  }
}
