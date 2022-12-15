const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
  #pool; #idGenerator;

  constructor(pool, idGenerator) {
    super();
    this.#pool = pool;
    this.#idGenerator = idGenerator;
  }
  async addThread(registerThread) {
    const {title, body} = registerThread;
    const id = `thread-${this.#idGenerator()}`;
    const userId = 'x';
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, user_id, title, body',
      values: [id, userId, title, body],
    };
    const result = await this.#pool.query(query);
    // return new RegisteredUser({...result.rows[0]});
    return {...result.rows[0]};
  }
}

module.exports = ThreadRepositoryPostgres;

