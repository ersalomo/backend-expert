const AddLike = require('../AddLike');

describe('an AddLike entities', () => {
  it('should throw error when payload did not contain needed property', async () => {
    // Arrange
    const payload = {
      idComment: '',
    };
    // Action && Assert
    expect(() => new AddLike(payload)).toThrowError('ADD_LIKE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', async () => {
    const payload = {
      owner: [],
      idComment: 'comment-123',
    };
    // Action && Assert
    expect(() => new AddLike(payload)).toThrowError('ADD_LIKE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should created AddLike coreectly', async () => {
    // Arrange
    const payload = {
      owner: 'user-1234',
      idComment: 'comment-1234',
    };
    // Action
    const { owner, idComment } = new AddLike(payload);
    // Assert
    expect(owner).toEqual('user-1234');
    expect(idComment).toEqual('comment-1234');
  });
});
