module.exports = class AddedLikeComment {
  constructor(payload) {
    const { id, id_comment: idComment, owner } = payload;

    if ((!id || !idComment, !owner)) {
      throw new Error('ADDED_LIKE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof id !== 'string' || typeof idComment !== 'string' || typeof owner !== 'string') {
      throw new Error('ADDED_LIKE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
};
