const LikesRepository = require('../../Domains/likes/LikesRepository');
const AddedLikeComment = require('../../Domains/likes/entities/AddedLike');

class LikeRepositoryPostgres extends LikesRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }
  async likeComment(addLikeComment) {
    // check isLiked
    const id = 'likes-' + this._idGenerator();
    const { idComment, owner } = addLikeComment;
    const query = {
      values: [id, idComment, owner],
      text: 'INSERT INTO likes(id, id_comment, id_user) VALUES($1, $2, $3) RETURNING id, id_comment, id_user as owner',
    };
    const result = await this._pool.query(query);
    return new AddedLikeComment(result.rows[0]);
  }
  async deleteLikeComment({ owner, idComment }) {
    const query = {
      values: [owner, idComment],
      text: 'DELETE FROM likes WHERE id_user = $1 AND id_comment = $2',
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }
  async isLiked({ owner, idComment }) {
    const query = {
      values: [owner, idComment],
      text: 'SELECT * FROM likes WHERE id_user = $1 AND id_comment = $2',
    };
    const result = await this._pool.query(query);
    return result.rowCount ? true : false;
  }
}

module.exports = LikeRepositoryPostgres;
