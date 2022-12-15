const CommentRepository = require('../../Domains/comments/CommentRepository');

class CommentRepositoryPostgres extends CommentRepository {
  #pool;
  #idGenerator;
  constructor(pool, idGenerator) {
    super();
    this.#pool = pool;
    this.#idGenerator = idGenerator;
  }

  async addComment(registerComment) {
    const {content} = registerComment;
    const id = `comment-${this.#idGenerator()}`;
    const userId = 'sdsd';
    const threadId = 'sdsd';
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id, user_id, content',
      values: [id, userId, threadId, content],
    };
    const result = await this.#pool.query(query);
    return {...result.rows[0]};
  }
}
module.exports = CommentRepositoryPostgres;
