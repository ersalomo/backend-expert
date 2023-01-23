const ReplyCommentRepository = require('../ReplyCommentRepository');

describe('ReplyCommentRepository interface', ()=>{
  it('should throw error when invoke abstract behavior', async ()=> {
    // Arrange
    const replyCommentRepository = new ReplyCommentRepository();

    // Action and Assert
    await expect(replyCommentRepository.getRepliesByThreadId(''))
        .rejects.toThrowError('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(replyCommentRepository.addReplyComment({}))
        .rejects.toThrowError('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(replyCommentRepository.verifyExistsReplyById(''))
        .rejects.toThrowError('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    // await expect(replyCommentRepository.verifyExistsCommentAndThreadByIds({}))
    //     .rejects.toThrowError('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(replyCommentRepository.deleteReplyComment({}))
        .rejects.toThrowError('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
