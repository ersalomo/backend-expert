/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const LikesTableTestHelper = {
  async addLikeComment({ id = 'like-123', idComment = 'comment-123', owner = 'user-123', date = new Date('2022-10-11').toISOString() }) {
    const query = {
      text: 'INSERT INTO likes(id, id_comment, id_user, date) VALUES($1, $2, $3, $4) RETURNING id, date',
      values: [id, idComment, owner, date],
    };
    const result = await pool.query(query);
    return result.rows[0];
  },
  async findLikeCommentById(id) {
    const query = {
      text: 'SELECT * FROM likes WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE likes CASCADE');
  },
};

module.exports = LikesTableTestHelper;
