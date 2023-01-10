const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async checkExistsThreadById(idThread) {
    const query = {
      text: 'SELECT id from threads WHERE id = $1',
      values: [idThread],
    };
    const result = await this._pool.query(query);
    if (result.rowCount < 1) {
      throw new NotFoundError('Thread tidak ditemukan');
    }
  }

  async addThread(registerThread) {
    const {owner, title, body} = registerThread;
    const id = `thread-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, title, user_id as owner',
      values: [id, owner, title, body],
    };
    const result = await this._pool.query(query);
    return new AddedThread({...result.rows[0]});
  }

  async getDetailThreadById(idThread) {
    const query = {
      text: `SELECT threads.id, threads.title, threads.body, threads.date, users.username
             FROM threads Left JOIN users
             ON threads.user_id = users.id where threads.id = $1`,
      values: [idThread],
    };
    const resultThread = await this._pool.query(query);
    if (!resultThread.rowCount) {
      throw new NotFoundError('Thread tidak ditemukan!');
    }
    return {...resultThread.rows[0]};
  }
}

module.exports = ThreadRepositoryPostgres;

