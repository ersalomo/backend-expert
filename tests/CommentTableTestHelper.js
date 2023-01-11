/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentTableTestHelper = {
  async addComment({
    id= 'comment-1234',
    userId= 'user-1234',
    threadId= 'thread-1234',
    content= 'new comment',
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, userId, threadId, content],
    };
    const result = await pool.query(query);
    return result.rows[0].id;
  },
  async deleteComment({
    id = 'comment-123',
    owner = 'user-123',
  }) {
    const query = {
      text: 'UPDATE comments SET is_deleted = true WHERE id = $1 AND owner = $2 RETURNING id',
      values: [id, owner],
    };

    await pool.query(query);
  },

  async findCommentById(id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments');
  },
};
module.exports = CommentTableTestHelper;
