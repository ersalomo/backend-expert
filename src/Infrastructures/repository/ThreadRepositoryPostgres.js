const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }
  async addThread(registerThread) {
    console.log('threadPOstgres');

    const {title, body} = registerThread;
    const id = `thread-${this._idGenerator()}`;
    const userId = 'x';
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, user_id, title, body',
      values: [id, userId, title, body],
    };
    const result = await this._pool.query(query);
    // return new RegisteredUser({...result.rows[0]});
    return {...result.rows[0]};
  }

  async veryfyUserId(idUser) {}
  async getThreads(idThread) {
    const query = {
      text: 'SELECT * FROM threads where id = $1',
      values: [idThread],
    };
    const result = await this._pool.query(query);
    return {...result.rows[0]};
  }
}

module.exports = ThreadRepositoryPostgres;

