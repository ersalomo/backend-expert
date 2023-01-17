import {Request, ResponseToolkit} from '@hapi/hapi'
import {Container} from 'instances-container';
import AddReplyCommentUseCase from '../../../../Applications/use_case/AddReplyCommentUseCase';
import DeleteReplyCommentUseCase from '../../../../Applications/use_case/DeleteReplyCommentUseCase';

export default class ReplyCommentHandler {
  constructor(private _container:Container) {
    this.addPostReplayComment = this.addPostReplayComment.bind(this);
    this.deletePostReplayComment = this.deletePostReplayComment.bind(this);
  }

  async addPostReplayComment(req:Request, h: ResponseToolkit) {
    const addReplyCommentUseCase = this._container.getInstance(AddReplyCommentUseCase.name);
    const {id: owner} = req.auth.credentials;
    const useCasePayload = {
      threadId: req.params.threadId,
      commentId: req.params.commentId,
      owner,
      content: req.payload.content,
    };
    const addedReply = await addReplyCommentUseCase.execute(useCasePayload);

    return h.response({
      status: 'success',
      data: {addedReply},
    }).code(201);
  }

  async deletePostReplayComment(req:Request, h: ResponseToolkit) {
    const deleteReplyCommentUseCase = this._container.getInstance(DeleteReplyCommentUseCase.name);
    const {id: owner}= req.auth.credentials;
    req.params.owner = owner;
    await deleteReplyCommentUseCase.execute(req.params);
    return h.response({
      status: 'success',
    }).code(200);
  }
}
