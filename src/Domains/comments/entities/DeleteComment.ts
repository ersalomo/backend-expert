export default class DeleteComment {
  public threadId: string;
  public commentId: string;
  public owner: string;
  constructor(payload:DeletePayload) {
    this._verifyPayload(payload);
    const {threadId, commentId, owner} = payload;

    this.threadId = threadId;
    this.commentId = commentId;
    this.owner = owner;
  }

  _verifyPayload(payload:DeletePayload) {
    const {threadId, commentId, owner} = payload;
    if (!threadId || !commentId || !owner) {
      throw new Error('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof threadId !== 'string' || typeof commentId !== 'string' || typeof owner !== 'string') {
      throw new Error('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
type DeletePayload = {
  threadId:string
  commentId:string
  owner:string
}

