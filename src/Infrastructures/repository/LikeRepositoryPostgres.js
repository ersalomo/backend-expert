const LikesRepository = require('../../Domains/likes/LikesRepository');

class LikeRepositoryPostgres extends LikesRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }
  async addLikeComment(addLikeComment) {}
  async unLikeComment(idLike) {}
  async checkLikeExistsById(idLike) {}
}

module.exports = LikeRepositoryPostgres;
