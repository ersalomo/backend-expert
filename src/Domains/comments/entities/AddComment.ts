
export default class AddComment {
  constructor(
    public owner: string,
    public content: string,
    public threadId: string,
  ) {
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

