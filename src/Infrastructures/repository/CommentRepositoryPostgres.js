const CommentRepository = require('../../Domains/comments/CommentRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const ForbiddenError = require('../../Commons/exceptions/ForbiddenError');
const AddedComment = require('../../Domains/comments/entities/AddedComment');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyExistsCommentById(commentId) {
    const query = {
      text: 'SELECT id FROM comments WHERE id = $1',
      values: [commentId],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('komentar tidak ditemukan');
    }
  }

  async deleteComment(ids) {
    const {commentId, owner} = ids;
    const query = {
      text: 'UPDATE comments SET is_deleted = TRUE WHERE id = $1 AND user_id = $2',
      values: [commentId, owner],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new ForbiddenError('Anda tidak pemilik comment ini!');
    }
  }

  async addComment(registerComment) {
    const {owner, threadId, content} = registerComment;
    const id = `comment-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO comments(id, user_id, thread_id, content) VALUES($1, $2, $3, $4) RETURNING id, content, user_id as owner',
      values: [id, owner, threadId, content],
    };
    const result = await this._pool.query(query);
    return new AddedComment({...result.rows[0]});
  }

  async getCommentsByThreadId(idThread) {
    const query = {
      values: [idThread],
      text: `SELECT comments.id, comments.date, comments.content,
              comments.is_deleted, users.username
              FROM comments INNER JOIN users ON comments.user_id = users.id
              WHERE comments.thread_id = $1 order by comments.date asc`,
    };
    const results = await this._pool.query(query);
    return results.rows;
  }
}
module.exports = CommentRepositoryPostgres;
