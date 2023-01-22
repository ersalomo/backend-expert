export default class CommentDetail {
  public id
  public content
  public date
  public username
  public replies
  constructor(payload:any) {
    this._verifyPayload(payload);
    const {id, content, date, username, is_deleted: isDeleted, replies} = payload;
    this.id = id;
    this.content = isDeleted ? '**komentar telah dihapus**' : content;
    this.date = date;
    this.username = username;
    this.replies = replies;
  }

  _verifyPayload(payload:any) {
    const {
      id,
      content,
      date,
      username,
      is_deleted: isDeleted,
      replies} = payload;
    if (!id ||
            !content ||
            !date ||
            !username ||
            !replies
    ) {
      throw new Error('COMMENT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' ||
            typeof content !== 'string' ||
            !(date instanceof Date) ||
            typeof username !== 'string' ||
            typeof isDeleted !== 'boolean' ||
            !(replies instanceof Array)
    ) {
      throw new Error('COMMENT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

