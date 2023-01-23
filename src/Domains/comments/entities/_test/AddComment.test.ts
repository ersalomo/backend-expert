const AddComment = require('../AddComment');

describe('an AddComment entities', function() {
  it('should throw error when payload did not contain needed property', async () =>{
    // Arrange
    const payload = {
      content: 'Masa sih',
      owner: 'user-123',
    };
    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      threadId: ['thread-123'],
      content: [],
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError(
        'ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });
  it('should create addComment object correctly', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
      content: 'Apa dengan cinta',
      owner: 'user-123',
    };

    // Action
    const {content, threadId, owner} = new AddComment(payload);

    // Assert
    expect(content).toEqual(payload.content);
    expect(threadId).toEqual(payload.threadId);
    expect(owner).toEqual(payload.owner);
  });
});
