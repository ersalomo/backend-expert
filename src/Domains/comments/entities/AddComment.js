
class AddComment {
  constructor({threadId, content}) {
    if (!content || !threadId) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof content !== 'string' || typeof threadId !== 'string') {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
    this.content = content;
    this.threadId = threadId;
  }
}

module.exports = AddComment;
