class AddReply {
  constructor({content}) {
    if (!content) {
      throw new('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string') {
      throw new('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.content = content;
  }
}
module.exports = AddReply;
