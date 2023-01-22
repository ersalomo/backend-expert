
export default class AddedReply {
  public id: string;
  public owner:string;
  public content:string;
  constructor(payload:any) {
    this._verifypayload(payload);
    const {id, owner, content} = payload;
    this.id = id;
    this.owner = owner;
    this.content = content;
  }

  _verifypayload({id, owner, content}:any) {
    if (!id || !owner || !content) {
      throw new Error('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof owner !== 'string' || typeof content !== 'string') {
      throw new Error('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
