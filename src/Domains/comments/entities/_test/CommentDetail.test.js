const CommentDetail = require('../CommentDetail');

describe('a CommentDetail entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = { id: 'comment-123' };

    // Action and Assert
    expect(() => new CommentDetail(payload)).toThrowError('COMMENT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      content: 'Tentang cerita dulu',
      date: '2021-08-08T07:19:09.775Z',
      username: [],
      is_deleted: '',
      replies: {},
    };

    // Action and Assert
    expect(() => new CommentDetail(payload)).toThrowError('COMMENT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create CommentDetail object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'Tentang cerita dulu',
      date: new Date('2021-08-08T07:19:09.775Z'),
      username: 'dicoding',
      is_deleted: false,
      replies: [],
      likeCount: 0,
    };

    // Action
    const { id, content, date, username, replies, likeCount } = new CommentDetail(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(content).toEqual(payload.content);
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
    expect(replies).toStrictEqual(payload.replies);
    expect(likeCount).toStrictEqual(payload.likeCount);
  });

  it('should create CommentDetail object when the content is deleted correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'Tentang cerita dulu',
      date: new Date('2021-08-08T07:19:09.775Z'),
      username: 'dicoding',
      is_deleted: true,
      replies: [],
      likeCount: 0,
    };

    // Action
    const { id, content, date, username, replies, likeCount } = new CommentDetail(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(content).toEqual('**komentar telah dihapus**');
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
    expect(replies).toStrictEqual(payload.replies);
    expect(likeCount).toStrictEqual(payload.likeCount);
  });
});
