const AddThread = require('../AddThread');

describe('an AddThread entities', () => {
  it('should throw error when payload did not contain needed property', async () => {
  // Arrange
    const payload = {
      owner: '',
      title: '',
      body: '',
    };
    // Action and Assert
    expect(() => new AddThread(payload).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'));
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 123,
      body: [],
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addThread object correctly', async () => {
    // Arrange
    const payload = {
      title: 'What Back End',
      body: 'I donno',
      owner: 'user-123',
    };
    // Action
    const {title, body, owner} = new AddThread(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
  });
});
