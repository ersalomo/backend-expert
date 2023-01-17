export default interface CommentRepository {
  addComment(registerComment)
  verifyExistsCommentById(commentId)
  deleteComment(ids)
  getCommentsByThreadId(threadId)
}
// throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
