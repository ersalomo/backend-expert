const ReplyCommentRepository = require('../../Domains/reply_comments/ReplyCommentRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

class ReplyRepositoryPostgres extends ReplyCommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }
  async verifyThreadId(threadId) {
    const query = {
      text: 'SELECT id from comments WHERE thread_id = $1',
      values: [threadId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Thread tidak ditemukan');
    }
  }

  async verifyCommentId(commentId) {
    const query = {
      text: 'SELECT id from comments WHERE id = $1',
      values: [commentId],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Comment tidak ditemukan');
    }
  }

  async verifyOwner(owner, replyId) {
    console.log(owner, 'replyCommentRepositorypos');
    const query = {
      text: 'SELECT * FROM reply_comments WHERE id_user = $1 AND id = $2', // salah nama tb
      values: [owner, replyId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new AuthorizationError('Anda tidak pemilik pesan ini!');
    }
  }

  async addReplyComment(addReply) {
    const {threadId, owner, commentId, content} = addReply;
    const id = `reply-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO reply_comments VALUES($1, $2, $3, $4, $5) RETURNING id, content, id_user as owner',
      values: [id, threadId, commentId, owner, content],
    };

    const result = await this._pool.query(query);
    return {...result.rows[0]};
  }
  async verifyReply(replyId) {
    const query = {
      text: 'SELECT id from reply_comments where id = $1',
      values: [replyId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Reply tidak ditumukan!');
    }
  }
  async deleteReplyComment(idReply) {
    const query = {
      text: 'UPDATE reply_comments SET is_delete = TRUE where id = $1',
      values: [idReply],
    };
    const result = await this._pool.query(query);

    return {...result.rows[0]};
  }
}

module.exports = ReplyRepositoryPostgres;
