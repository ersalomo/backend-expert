
export default class AddThread {
  public owner: string;
  public title:string;
  public body:string;
  constructor(payload: AddThreadAPayload) {
    this._verifyPayload(payload);
    const {owner, title, body} = payload;
    this.owner = owner;
    this.title = title;
    this.body = body;
  }
  _verifyPayload(payload:AddThreadAPayload):void {
    const {owner, title, body} = payload;
    if (!owner || !title || !body) {
      throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof owner !== 'string' || typeof title !== 'string' || typeof body !== 'string') {
      throw new Error('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
};

type AddThreadAPayload = {
  owner:string;
  title:string;
  body:string;
}

