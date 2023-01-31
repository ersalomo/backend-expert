const AddedLike = require('../AddedLike');

describe('an AddedLike entities', () => {
  it("should throw error when payload did'nt contain needed property", async () => {
    // Arrange
    const payload = {
      id: '',
      idComment: '',
      owner: '',
    };
    // Action && Assert
    expect(() => new AddedLike(payload)).toThrowError('ADDED_LIKE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it("should throw error when payload did'nt meet data type specification", async () => {
    // Arrange
    const payload = {
      id: [],
      idComment: 'comment-123',
      owner: 'owner-123',
    };
    // Action && Assert
    expect(() => new AddedLike(payload)).toThrowError('ADDED_LIKE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create AddedLike correctly', async () => {
    // Arrange
    const payload = {
      id: 'like-123',
      id_comment: 'comment-123',
      owner: 'owner-123',
    };
    // Action
    const { id, idComment, owner } = new AddedLike(payload);
    // Assert
    expect(id).toEqual('like-123');
    expect(idComment).toEqual('comment-123');
    expect(owner).toEqual('owner-123');
  });
});
