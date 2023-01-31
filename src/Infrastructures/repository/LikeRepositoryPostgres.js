const ForbiddenError = require('../../Commons/exceptions/ForbiddenError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const LikesRepository = require('../../Domains/likes/LikesRepository');
const AddedLikeComment = require('../../Domains/likes/entities/AddedLike');

class LikeRepositoryPostgres extends LikesRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }
  async addLikeComment(addLikeComment) {
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
  async unLikeComment(owner, idLike) {
    const query = {
      values: [owner, idLike],
      text: 'UPDATE FROM likes SET is_liked = FALSE WHERE owner = $1 AND id = $2',
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new ForbiddenError('Anda bukan pemilik likes ini'); // harusnya ini tidak usah
    }
    // return result[0];
  }
  async checkLikeExistsById(idLike) {
    const query = {
      text: 'SELECT * FROM likes WHERE id = $1',
      values: [idLike],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('No like found!'); // masa like di cari hah?
    }
    return true;
  }
  async isLiked(owner, idComment) {
    const query = {
      values: [owner, idComment],
      text: 'SELECT * FROM likes WHERE id_user = $1 AND id_comment = $2',
    };
    const result = await this._pool.query(query);
    return result.rowCount ? true : false;
  }
}

module.exports = LikeRepositoryPostgres;
