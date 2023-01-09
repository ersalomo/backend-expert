const CommentRepository = require('../../Domains/comments/CommentRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');


class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyThreadId(threadId) {
    const query = {
      text: 'SELECT thread_id from comments WHERE thread_id = $1',
      values: [threadId],
    };
    const result = await this._pool.query(query);

    if (result.rowCount < 1) {
      throw new NotFoundError('Thread tidak ditemukan');
    }
  }

  async verifyCommentId(commentId) {
    const query = {
      text: 'SELECT id from comments WHERE id = $1',
      values: [commentId],
    };
    const result = await this._pool.query(query);

    if (result.rowCount < 1) {
      throw new NotFoundError('Comment tidak ditemukan');
    }
  }

  async verifyOwner(owner, commentId) {
    const query = {
      text: 'SELECT * FROM comments WHERE user_id = $1 AND id = $2',
      values: [owner, commentId],
    };
    const result = await this._pool.query(query);
    if (result.rowCount < 1) {
      throw new AuthorizationError('Anda tidak pemilik comment ini!');
    }
  }

  async deleteComment(commentId) {
    // just update column update
    const query = {
      text: 'UPDATE comments SET is_delete = TRUE where  id = $1',
      values: [commentId],
    };
    const result = await this._pool.query(query);
    return {...result.rows[0]};
  }

  async addComment(registerComment) {
    const {owner, threadId, content} = registerComment;
    const id = `comment-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id, content, user_id as owner',
      values: [id, owner, threadId, content],
    };
    const result = await this._pool.query(query);
    return {...result.rows[0]};
  }
}
module.exports = CommentRepositoryPostgres;
