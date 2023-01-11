
class AddedReply {
  constructor(payload) {
    const {id, owner, content} = payload;
    this.id = id;
    this.owner = owner;
    this.content = content;
  }
  _verifypayload({id, owner}) {
    if (!id || !owner || !content) {
      throw new Error('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || commentId !== 'string' || content !== 'string') {
      throw new Error('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedReply;
