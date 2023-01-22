import AddReply from '../../Domains/reply_comments/entities/AddReply';
import ReplyCommentRepository from '../../Domains/reply_comments/ReplyCommentRepository';
import CommentRepository from '../../Domains/comments/CommentRepository';

export default class AddPostReplayCommentUseCase {
  private _replyCommentRepository:ReplyCommentRepository;
  private _commentRepository:CommentRepository;
  constructor(params:{replyCommentRepository:ReplyCommentRepository, commentRepository:CommentRepository}) {
    this._replyCommentRepository = params.replyCommentRepository;
    this._commentRepository = params.commentRepository;
  }

  async execute(useCasePayload:any) {
    const addReply = new AddReply(useCasePayload);
    await this._commentRepository.verifyExistsCommentById(addReply.commentId);
    return this._replyCommentRepository.addReplyComment(addReply);
  }
}

