const ThreadDetail = require('../../Domains/threads/entities/ThreadDetail');
const CommentDetail = require('../../Domains/comments/entities/CommentDetail');
const ReplyDetail = require('../../Domains/reply_comments/entities/ReplyDetail');

class DetailThreadUseCase {
  constructor({ threadRepository, commentRepository, replyCommentRepository, likeRepository }) {
    this._threadRepository = threadRepository;
    this._commentcommentRepository = commentRepository;
    this._replyCommentRepository = replyCommentRepository;
    this._likeRepository = likeRepository;
  }

  async execute(useCasePayload) {
    await this._threadRepository.checkExistsThreadById(useCasePayload);
    const detailThread = await this._threadRepository.getDetailThreadById(useCasePayload);
    const comments = await this._commentcommentRepository.getCommentsByThreadId(useCasePayload);
    const replies = await this._replyCommentRepository.getRepliesByThreadId(useCasePayload);
    const likesCount = await this._likeRepository.getCountComentLikedByThreadId({ threadId: useCasePayload });
    detailThread.comments = this._getDetailsCommentReplies(comments, replies, likesCount);
    return new ThreadDetail(detailThread);
  }

  _getDetailsCommentReplies(comments, replies, likes) {
    return comments?.map((comment) => {
      comment.replies = replies?.filter((reply) => reply.id_comment === comment.id).map((reply) => new ReplyDetail(reply));
      const likeCount = likes?.find((like) => like.id_comment === comment.id);
      comment.likeCount = likeCount === undefined ? 0 : parseInt(likeCount.like_count);
      return new CommentDetail(comment);
    });
  }
}

module.exports = DetailThreadUseCase;
