/* istanbul ignore file */
import {pool} from '../src/Infrastructures/database/postgres/pool';
export const ThreadTableTestHelper = {
  async addThread({
    id= 'thread-123',
    userId= 'user-123',
    title= 'New Thread',
    body= 'New body',
    date= (new Date()).toISOString(),
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5)',
      values: [id, userId, title, body, date],
    };
    const result = await pool.query(query);
    return result.rows[0];
  },
  async findThreadById(id:string) {
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
