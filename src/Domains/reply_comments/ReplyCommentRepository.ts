import AddedReply from './entities/AddedReply'
import AddReply from './entities/AddReply'

export default interface ReplyCommentRepository {
  addReplyComment(addReply:AddReply):Promise<AddedReply>
  deleteReplyComment(ids:{replyId:string, owner:string}):any
  verifyExistsReplyById(replyId:string):any
  getRepliesByThreadId(threadId:string):any
}
// async verifyExistsCommentAndThreadByIds(ids) {
//   throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
// }
