const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const AddedThread = require('../../Domains/threads/entities/AddedThread');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }
  async addThread(registerThread) {
    console.log('threadPOstgres');
    const {owner, title, body} = registerThread;
    const id = `thread-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, title, user_id as owner',
      values: [id, owner, title, body],
    };
    const result = await this._pool.query(query);
    return new AddedThread({...result.rows[0]});
  }

  async veryfyUserId(idUser) {}

  async getThreads(idThread) {
    // const query = {
    //   text: 'SELECT id, title, user_id as owner FROM threads where id = $1',
    //   values: [idThread],
    // };
    const query = { // thread-4lYJdtwRu3fllF_pF_11W
      text: 'SELECT id, title, body, date, user_id as username FROM threads where id = $1',
      values: [idThread],
    };
    const queryCommentThread = {
      values: [idThread], // **komentar telah dihapus** untuk is_delete = 1
      text: 'SELECT id,user_id as username, date, content FROM comments where thread_id in ($1)',
    };
    const resultThread = await this._pool.query(query);
    const resultCommentThread = await this._pool.query(queryCommentThread);
    // return {...result.rows[0]};
    resultThread.rows[0].comments = resultCommentThread.rows;
    return {...resultThread.rows[0]};
  }
}

module.exports = ThreadRepositoryPostgres;

