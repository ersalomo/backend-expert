export default abstract class ReplyCommentRepository {
  abstract addReplyComment(addReply:object):Promise<any>
  abstract deleteReplyComment(ids:{replyId:string, owner:string}):Promise<void>
  abstract verifyExistsReplyById(replyId:string):Promise<void>
  abstract getRepliesByThreadId(threadId:string):Promise<Array<{}>>
}
