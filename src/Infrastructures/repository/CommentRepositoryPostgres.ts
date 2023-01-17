import CommentRepository from '../../Domains/comments/CommentRepository';
import NotFoundError from '../../commons/exceptions/NotFoundError';
import ForbiddenError from '../../commons/exceptions/ForbiddenError';
import AddComment from '../../Domains/comments/entities/AddComment';
import {Pool} from 'pg';


export default class CommentRepositoryPostgres implements CommentRepository {
  constructor(private _pool:Pool, private _idGenerator:any) {}

  async verifyExistsCommentById(commentId:string) {
    const query = {
      text: 'SELECT id from comments WHERE id = $1',
      values: [commentId],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('komentar tidak ditemukan');
    }
  }

  async deleteComment(ids:any) {
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

  async addComment(registerComment:AddComment) {
    const {owner, threadId, content} = registerComment;
    const id = `comment-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id, content, user_id as owner',
      values: [id, owner, threadId, content],
    };
    const result = await this._pool.query(query);
    return {...result.rows[0]};
  }

  async getCommentsByThreadId(idThread:string) {
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
