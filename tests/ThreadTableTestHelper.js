/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadTableTestHelper = {
  async addThread({
    id= 'thread-123',
    userId= 'user-123',
    title= 'New Thread',
    body= 'New body',
    // date= ('"2021-08-08T00:19:09.775Z"'),
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4)',
      values: [id, userId, title, body],
    };
    const result = await pool.query(query);
    return result.rows[0];
  },
  async findThreadById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads');
  },
};

module.exports = ThreadTableTestHelper;
