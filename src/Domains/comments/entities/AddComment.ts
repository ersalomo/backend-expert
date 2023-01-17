
export default class AddComment {
  public owner: string;
  public content: string;
  public threadId: string;
  constructor(payload: {
    owner: string,
    content: string,
    threadId: string,
  }) {
    const {owner, content, threadId} = payload
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

