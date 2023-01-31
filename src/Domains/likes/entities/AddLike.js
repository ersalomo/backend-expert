module.exports = class AddLikeComment {
  constructor(payload) {
    const { idComment, owner } = payload;
    if (!idComment || !owner) {
      throw new Error('ADD_LIKE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof idComment !== 'string' || typeof owner !== 'string') {
      throw new Error('ADD_LIKE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
    this.idComment = idComment;
    this.owner = owner;
  }
};
