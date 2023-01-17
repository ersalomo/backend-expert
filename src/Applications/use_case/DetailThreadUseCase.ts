import ThreadDetail from '../../Domains/threads/entities/ThreadDetail';
import CommentDetail from '../../Domains/comments/entities/CommentDetail';
import ReplyDetail from '../../Domains/reply_comments/entities/ReplyDetail'
import ThreadRepository from '../../Domains/threads/ThreadRepository';
import CommentRepository from '../../Domains/comments/CommentRepository';
import ReplyCommentRepository from '../../Domains/reply_comments/ReplyCommentRepository';

export default class DetailThreadUseCase {
  constructor(
    private _threadRepository:ThreadRepository,
    private _commentRepository: CommentRepository,
    private _replyCommentRepository: ReplyCommentRepository,
  ) {}

  async execute(useCasePayload) {
    const detailThread = await this._threadRepository.getDetailThreadById(useCasePayload);
    const comments = await this._commentRepository.getCommentsByThreadId(useCasePayload);
    const replies = await this._replyCommentRepository.getRepliesByThreadId(useCasePayload);
    detailThread.comments = this._getDetailsCommentReplies(comments, replies);
    return new ThreadDetail(detailThread);
  }

  _getDetailsCommentReplies(comments:any[], replies: any[]) {
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

