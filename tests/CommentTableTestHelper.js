/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentTableTestHelper = {
  async addComment({
    id= 'comment-1234',
    userId= 'user-1234',
    content= 'new comment',
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4)',
      values: [id, userId, content],
    };
    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE comments');
  },
};
module.exports = CommentTableTestHelper;
