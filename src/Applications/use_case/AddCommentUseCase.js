
const AddComment = require('../../Domains/comments/entities/AddComment');

class AddCommentUseCase {
  constructor({commentRepository}) {
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const {content, threadId} = useCasePayload;
    const addComment = new AddComment({content: content, threadId: threadId});
    await this._commentRepository.verifyThreadId(addComment.threadId);
    return this._commentRepository.addComment(addComment);
  }
}
module.exports = AddCommentUseCase;
