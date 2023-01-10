class DetailThreadUseCase {
  constructor({threadRepository, commentRepository, replyCommentRepository}) {
    this._threadRepository = threadRepository;
    this._commentcommentRepository = commentRepository;
    this._replyCommentRepository = replyCommentRepository;
  }

  async execute(useCasePayload) {
    const detailThread = await this._threadRepository.getDetailThreadById(useCasePayload);
    const comments = await this._commentcommentRepository.getCommentsByThreadId(useCasePayload);
    const replies = await this._replyCommentRepository.getRepliesByThreadId(useCasePayload);

    detailThread.comments = this._getDetailsCommentReplies(comments, replies);
    return detailThread;
  }

  _getDetailsCommentReplies(comments, replies) {
    return comments?.map((comment) => {
      (comment.is_deleted) ? comment.content = '**komentar telah dihapus**' : ''; delete comment.is_deleted;
      comment.replies = replies?.filter((reply) => reply.id_comment === comment.id)
          .map((reply)=>{
            (reply.is_deleted) ? (reply.content = '**komentar telah dihapus**') : '';
            delete reply.is_deleted; delete reply.id_comment;
            return reply;
          });
      return comment;
    });
  }
}

module.exports = DetailThreadUseCase;
