/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadTableTestHelper = {
  async addThread({
    id= 'thread-1234',
    userId= 'users-23242',
    title= 'New Thread',
    body= 'New body',
    date= (new Date()).toISOString(),
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5)',
      values: [id, userId, title, body, date],
    };
    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE threads');
  },
};

module.exports = ThreadTableTestHelper;
