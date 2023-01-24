import ReplyCommentRepository from '../ReplyCommentRepository';

describe('ReplyCommentRepository interface', ()=>{
  it('should throw error when invoke abstract behavior', async ()=> {
    // Arrange
    class ReplyRepositoryPostgresTest extends ReplyCommentRepository {
      async addReplyComment(addReply: object): Promise<any> {
        throw new Error('Method not implemented.');
      }
      async deleteReplyComment(ids: { replyId: string; owner: string; }): Promise<void> {
        throw new Error('Method not implemented.');
      }
      async verifyExistsReplyById(replyId: string): Promise<void> {
        throw new Error('Method not implemented.');
      }
      async getRepliesByThreadId(threadId: string): Promise<{}[]> {
        throw new Error('Method not implemented.');
      }
    }
    const replyCommentRepository = new ReplyRepositoryPostgresTest();

    // Action and Assert
    await expect(replyCommentRepository.getRepliesByThreadId(''))
        .rejects.toThrowError('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(replyCommentRepository.addReplyComment({}))
        .rejects.toThrowError('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(replyCommentRepository.verifyExistsReplyById(''))
        .rejects.toThrowError('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    // await expect(replyCommentRepository.verifyExistsCommentAndThreadByIds({}))
    //     .rejects.toThrowError('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(replyCommentRepository.deleteReplyComment({} as {replyId: string, owner:string}))
        .rejects.toThrowError('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
