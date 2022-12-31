const ReplyCommentRepository = require('../../Domains/replay_comments/ReplyCommentRepository');

class ReplayRepositoryPostgres extends ReplyCommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addReplyComment(addReply) {
    console.log('Add reply repository');
    const {content} = addReply;
    const id = `reply-${this._idGenerator()}`;
    const idComment = 'id-comment';
    const idUser = 'id-user';

    const query = {
      text: 'INSERT INTO replay_comments VALUES($1, $2, $3, $4) RETURNING id, content, id_user as owner',
      values: [id, idComment, idUser, content],
    };

    const result = await this._pool.query(query);
    return result;
  }

  async deleteReplyComment(idReply) {}
}

module.exports = ReplayRepositoryPostgres;
