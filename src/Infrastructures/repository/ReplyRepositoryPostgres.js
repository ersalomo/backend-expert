const ReplyCommentRepository = require('../../Domains/reply_comments/ReplyCommentRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

class ReplyRepositoryPostgres extends ReplyCommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyExistsCommentAndThreadByIds({threadId, commentId}) {
    const query = {
      values: [commentId, threadId],
      text: `SELECT reply_comments.id FROM reply_comments
             INNER JOIN comments
             ON reply_comments.id_comment = $1
             INNER JOIN threads
             ON threads.id = comments.thread_id
             WHERE comments.thread_id = $2`,
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Comment or Thread tidak ditemukan!');
    }
  }

  async addReplyComment(addReply) {
    const {owner, commentId, content} = addReply;
    const id = `reply-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO reply_comments VALUES($1, $2, $3, $4) RETURNING id, content, id_user as owner',
      values: [id, commentId, owner, content],
    };

    const result = await this._pool.query(query);
    return {...result.rows[0]};
  }

  async verifyExistsReplyById(replyId) {
    const query = {
      text: 'SELECT id from reply_comments where id = $1',
      values: [replyId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Reply tidak ditemukan!');
    }
  }

  async deleteReplyComment({replyId, owner}) {
    const query = {
      text: 'UPDATE reply_comments SET is_deleted = TRUE where id = $1 AND id_user = $2',
      values: [replyId, owner],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new AuthorizationError('Anda tidak pemilik pesan ini!');
    }
    return {...result.rows[0]};
  }

  async getRepliesByThreadId(idThread) {
    const query = {
      values: [idThread],
      text: `SELECT reply_comments.id, reply_comments.content, reply_comments.date, users.username, reply_comments.is_deleted, comments.id as id_comment
             FROM reply_comments INNER JOIN users ON reply_comments.id_user = users.id
             INNER JOIN comments ON reply_comments.id_comment = comments.id
             WHERE comments.thread_id = $1 ORDER BY reply_comments.date`,
    };

    const replies = await this._pool.query(query);
    return replies.rows;
  }
}

module.exports = ReplyRepositoryPostgres;
