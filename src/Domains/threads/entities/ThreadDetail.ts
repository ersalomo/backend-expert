export default class ThreadDetail {
  public id: string;
  public title: string;
  public body: string;
  public date: Date;
  public username:string;
  public comments:any
  constructor(payload:any) {
    this._verifyPayload(payload);
    const {id, title, body, date, username, comments} = payload;
    this.id = id;
    this.title = title;
    this.body = body;
    this.date = date;
    this.username = username;
    this.comments = comments;
  }

  _verifyPayload(payload:any) {
    const {id, title, body, date, username, comments} = payload;
    if (!id || !title || !body || !date || !username || !comments) {
      throw new Error('THREAD_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' ||
            typeof title !== 'string' ||
            typeof body !== 'string' ||
            !(date instanceof Date) ||
            typeof username !== 'string' ||
            !(comments instanceof Array)
    ) {
      throw new Error('THREAD_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

