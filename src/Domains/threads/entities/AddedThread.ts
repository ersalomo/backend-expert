export default class AddedThread {
  public id: string;
  public title: string;
  public owner:string
  constructor({id, owner, title}:any) {
    this._verifyPayload({id, owner, title});
    this.id = id;
    this.title = title;
    this.owner = owner;
  }

  private _verifyPayload({id, owner, title}:any) {
    if (!id || !owner || !title) {
      throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof owner !== 'string' || typeof title !== 'string') {
      throw new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

