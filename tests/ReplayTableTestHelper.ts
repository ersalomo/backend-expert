/* istanbul ignore file */
import {pool} from '../src/Infrastructures/database/postgres/pool';
export const ReplayTableTestHelper = {
  async addReply({
    id = 'reply-123',
    commentId = 'comment-123',
    content = 'Wow Wok',
    owner = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO reply_comments VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, commentId, owner, content],
    };
    const result = await pool.query(query);
    return result.rows[0].id;
  },
  async deleteReply({
    id = 'reply-123',
    owner = 'user-123',
  }) {
    const query = {
      text: 'UPDATE reply_comments SET is_deleted = true WHERE id = $1 AND id_user = $2 RETURNING id',
      values: [id, owner],
    };

    await pool.query(query);
  },

  async findReplyById(id) {
    const query = {
      values: [id],
      text: 'SELECT * FROM reply_comments WHERE id = $1',
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE reply_comments CASCADE');
  },
};

