export default class AddedComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const {id, content, owner} = payload;

    this.content = content;
    this.id = id;
    this.owner = owner;
  }
  _verifyPayload({id, content, owner}) {
    if (!id || !content || !owner) {
      throw new Error('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof content !== 'string' || typeof owner !== 'string') {
      throw new Error('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
};

