import ReplyCommentRepository from '../../Domains/reply_comments/ReplyCommentRepository';
import AddedReply from '../../Domains/reply_comments/entities/AddedReply';
import AddReply from '../../Domains/reply_comments/entities/AddReply';
import ForbiddenError from '../../Commons/exceptions/ForbiddenError';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import {Pool} from 'pg';

export default class ReplyRepositoryPostgres extends ReplyCommentRepository {
  constructor(private _pool:Pool, private _idGenerator:any) {
    super()
  }

  async addReplyComment(addReply:AddReply):Promise<any> {
    const {owner, commentId, content} = addReply;
    const id = `reply-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO reply_comments VALUES($1, $2, $3, $4) RETURNING id, content, id_user as owner',
      values: [id, commentId, owner, content],
    };

    const result = await this._pool.query(query);
    return new AddedReply({...result.rows[0]});
  }

  async verifyExistsReplyById(replyId:string) {
    const query = {
      text: 'SELECT id FROM reply_comments WHERE id = $1',
      values: [replyId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Reply tidak ditemukan!');
    }
  }

  async deleteReplyComment(ids:any) {
    const {replyId, owner} = ids;
    const query = {
      text: 'UPDATE reply_comments SET is_deleted = TRUE where id = $1 AND id_user = $2',
      values: [replyId, owner],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new ForbiddenError('Anda tidak pemilik pesan ini!');
    }
    return {...result.rows[0]};
  }

  async getRepliesByThreadId(idThread:string) {
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

