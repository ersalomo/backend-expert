import CommentRepository from '../CommentRepository';

describe('commentRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    class CommentRepositoryPostgresTest extends CommentRepository {
      async addComment(registerComment: object): Promise<void> {
        throw new Error('Method not implemented.');
      }
      async verifyExistsCommentById(commentId: string): Promise<void> {
        throw new Error('Method not implemented.');
      }
      async deleteComment(ids: object): Promise<void> {
        throw new Error('Method not implemented.');
      }
      async getCommentsByThreadId(threadId: string): Promise<{}> {
        throw new Error('Method not implemented.');
      }
    }
    const commentRepository = new CommentRepositoryPostgresTest();

    await expect(commentRepository.addComment({})).rejects.toThrowError(
        'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(commentRepository.verifyExistsCommentById('')).rejects.toThrowError(
        'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(commentRepository.getCommentsByThreadId('')).rejects.toThrowError(
        'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(commentRepository.deleteComment({})).rejects.toThrowError(
        'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
