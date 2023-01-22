import ReplyRepositoryPostgres from '../../Domains/reply_comments/ReplyCommentRepository';
// import CommentRepository from '../../Domains/comments/CommentRepository';

export default class DeleteReplyCommentUseCase {
  constructor(
    private _replyCommentRepository: ReplyRepositoryPostgres,
  // private _commentRepository: CommentRepository,
  ) {}

  async execute(useCasePayload:any) {
    const {owner, replyId} = useCasePayload;
    // const {threadId, commentId, owner, replyId} = useCasePayload;
    // gimana kalo thread dan comment tidak ada tapi reply ada
    // await this._replyCommentRepository.verifyExistsCommentAndThreadByIds({threadId, commentId});
    await this._replyCommentRepository.verifyExistsReplyById(replyId);
    return this._replyCommentRepository.deleteReplyComment({replyId, owner});
  }
}
