export default class AddReply {
  public commentId:string;
  public owner:string;
  public content:string;
  constructor(payload:AddReplyPayload) {
    const {commentId, owner, content} = payload;
    if (!commentId || !owner || !content) {
      throw new Error('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof commentId !== 'string'|| typeof owner !== 'string' || typeof content !== 'string') {
      throw new Error('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
    this.commentId = commentId;
    this.owner = owner;
    this.content = content;
  }
}
type AddReplyPayload = {
  commentId:string;
  owner:string;
  content:string;
};
