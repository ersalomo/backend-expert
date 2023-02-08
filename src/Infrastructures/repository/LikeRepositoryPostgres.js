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
    const id = 'like-' + this._idGenerator();
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
  async getCountComentLikedByThreadId({ threadId }) {
    /*
    SELECT * FROM likes l INNER JOIN comments c
    ON l.id_comment = c.id where c.thread_id = 'thread-53Em92CCuzN5sOwT3';
    */

    const query = {
      text: `SELECT l.id_comment, COUNT(l.id) as like_count
              FROM likes l
              INNER JOIN comments c
              ON l.id_comment = c.id
              INNER JOIN threads t
              ON c.thread_id = t.id
              WHERE t.id = $1
              GROUP BY l.id_comment`,
      values: [threadId],
    };
    const result = await this._pool.query(query);
    return result.rows;
    /**
     * SELECT * FROM likes l
     * inner join comments c
     * on l.id_comment = c.id
     * inner join threads t
     * on c.thread_id = t.id where t.id = 'thread-53Em92CCuzN5sOwT3';
     */
  }
}

module.exports = LikeRepositoryPostgres;
