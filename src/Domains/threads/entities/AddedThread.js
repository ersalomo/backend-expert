class AddedThread {
  constructor(payload) {
    this._verifyPayload(payload);

    const {id, userId, title, content} = payload;

    this.id = id;
    this.userId = userId;
    this.title = title;
    this.content = content;
  }

  _verifyPayload({id, userId, title, content}) {
    if (!id || !username || !fullname) {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedThread;
