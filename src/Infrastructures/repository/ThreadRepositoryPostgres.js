const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
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

  async getThreads(idThread) {
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
    const queryCommentThread = {
      values: [idThread],
      text: `SELECT comments.id, comments.date, comments.content,
              comments.is_delete, users.username
              FROM comments INNER JOIN users ON comments.user_id = users.id
              WHERE comments.thread_id = $1 order by comments.date asc`,
    };
    const resultCommentThread = await this._pool.query(queryCommentThread);

    // if (resultCommentThread.rowCount) {
    resultCommentThread.rows = resultCommentThread.rows.map((val, i) => {
      if (val.is_delete) {
        val.content = '**komentar telah dihapus**';
      }
      delete val.is_delete;
      return val;
    });
    // }
    resultThread.rows[0].comments = await Promise.all(
        await this.#getReplies(resultCommentThread.rows),
    ).then((val)=> val);
    return {...resultThread.rows[0]};
  }

  async #getReplies(arrayComment) {
    return arrayComment.map(async (val, i) => {
      const queryReplyComment = {
        text: `SELECT reply_comments.id, reply_comments.content, reply_comments.date, users.username, reply_comments.is_delete
            FROM reply_comments INNER JOIN users ON reply_comments.id_user = users.id
            WHERE reply_comments.id_comment = $1`,
        values: [val.id],
      };

      const replies = await this._pool.query(queryReplyComment);
      val.resplies = replies.rows;
      val.resplies.map((val)=>{
        if (val.is_delete) {
          val.content = '**komentar telah dihapus**';
        }
        delete val.is_delete;
        return val;
      });
      return val;
    });
  }
}

module.exports = ThreadRepositoryPostgres;

