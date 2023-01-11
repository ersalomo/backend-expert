class AddReply {
  constructor({commentId, owner, content}) {
    if (!content ) {
      throw new Error('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string') {
      throw new Error('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
    this.commentId = commentId;
    this.owner = owner;
    this.content = content;
  }
}
module.exports = AddReply;
