class ReplyCommentRepository {
  addReplyComment(addReply) {
    throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  deleteReplyComment(ids) {
    throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  verifyExistsReplyById(replyId) {
    throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  verifyExistsCommentAndThreadByIds(ids) {
    throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  getRepliesByThreadId(threadId) {
    throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ReplyCommentRepository;
