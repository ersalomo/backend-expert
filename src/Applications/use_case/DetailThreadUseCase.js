const ThreadDetail = require('../../Domains/threads/entities/ThreadDetail');
const CommentDetail = require('../../Domains/comments/entities/CommentDetail');
const ReplyDetail = require('../../Domains/reply_comments/entities/ReplyDetail');

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
    return new ThreadDetail(detailThread);
  }

  _getDetailsCommentReplies(comments, replies) {
    return comments.map((comment) => {
      comment.replies =
              replies?.filter(
                  (reply) => reply.id_comment === comment.id)
                  .map(
                      (reply) => new ReplyDetail(reply));
      return new CommentDetail(comment);
    });
  }
}

module.exports = DetailThreadUseCase;
