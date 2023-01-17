import {Request, ResponseToolkit} from '@hapi/hapi'
import {Container} from 'instances-container';
import AddCommentUseCase from '../../../../Applications/use_case/AddCommentUseCase';
import DeleteCommentUseCase from '../../../../Applications/use_case/DeleteCommentUseCase';


export default class CommentHandler {
  constructor(private _container:Container) {
    this.postAddComment = this.postAddComment.bind(this);
    this.deleteCommentThread = this.deleteCommentThread.bind(this);
  }

  async postAddComment(req:Request, h:ResponseToolkit) {
    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
    const {id: owner} = req.auth.credentials;
    const comment = {
      owner: owner,
      threadId: req.params.threadId,
      content: req.payload.content,
    };
    const addedComment = await addCommentUseCase.execute(comment);

    return h.response({
      status: 'success',
      data: {
        addedComment,
      },
    }).code(201);
  }

  async deleteCommentThread(req:Request, h:ResponseToolkit) {
    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
    const {id: owner} = req.auth.credentials;
    const {threadId, commentId} = req.params;
    const useCasePayload = {
      owner,
      threadId,
      commentId,
    };
    await deleteCommentUseCase.execute(useCasePayload);

    return h.response({
      status: 'success',
    }).code(200);
  }
}
