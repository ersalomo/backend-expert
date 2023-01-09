

class ReplyCommentRepository {
  addReplyComment(addReply) {
    throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  verifyThreadId(threadId) {
    throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  verifyCommentId(commentId) {
    throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  verifyOwner(userId, replyId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  deleteReplyComment(replyId) {
    throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  verifyReply(replyId) {
    throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  } // perlu lagi kah
}

module.exports = ReplyCommentRepository;
