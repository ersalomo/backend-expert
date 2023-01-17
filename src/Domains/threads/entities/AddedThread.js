class AddedThread {
  constructor({id, owner, title}) {
    this._verifyPayload({id, owner, title});
    this.id = id;
    this.title = title;
    this.owner = owner;
  }

  _verifyPayload({id, owner, title}) {
    if (!id || !owner || !title) {
      throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof owner !== 'string' || typeof title !== 'string') {
      throw new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedThread;
