export default abstract class CommentRepository {
  abstract addComment(registerComment: object): Promise<void>;
  abstract verifyExistsCommentById(commentId:string):Promise<void>
  abstract deleteComment(ids: object): Promise<void>
  abstract getCommentsByThreadId(threadId:string): Promise<{}>
}
