
class AddComment {
  constructor({owner, threadId, content}) {
    if (!owner || !content || !threadId) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof owner !== 'string'|| typeof content !== 'string' || typeof threadId !== 'string') {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.owner = owner;
    this.content = content;
    this.threadId = threadId;
  }
}

module.exports = AddComment;
