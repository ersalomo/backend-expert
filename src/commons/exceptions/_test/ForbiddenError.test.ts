import ForbiddenError from '../ForbiddenError';

describe('ForbiddenError', () => {
  it('should create error correctly', () => {
    const forbiddenError = new ForbiddenError('not authorization!');

    expect(forbiddenError.message).toEqual('not authorization!');
    expect(forbiddenError.statusCode).toEqual(403);
    expect(forbiddenError.name).toEqual('ForbiddenError');
  });
});
