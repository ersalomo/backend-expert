/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ReplayTableTestHelper = {
  async postReplay() {
    const query = {
      text: '',
      values: [],
    };
    const result = await pool.query(query);
    return result;
  },
};

module.exports = ReplayTableTestHelper;
