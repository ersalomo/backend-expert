import {Request, ResponseToolkit} from '@hapi/hapi';
import AddThreadUseCase from '../../../../Applications/use_case/AddThreadUseCase';
import DetailThreadUseCase from '../../../../Applications/use_case/DetailThreadUseCase';
import {Container} from 'instances-container';

export default class ThreadsHandler {
  constructor(private _container:Container) {
    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreads = this.getThreads.bind(this);
  }

  async postThreadHandler(request: Request, h: ResponseToolkit) {
    // const {id: owner} = request.auth.credentials;
    const addThreadUseCase:AddThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    // request.payload.owner = owner;
    const addedThread = await addThreadUseCase.execute(request.payload);
    const response = h.response({
      status: 'success',
      data: {addedThread},
    });
    response.code(201);
    return response;
  }

  async getThreads(req: Request, h:ResponseToolkit) {
    const detailThreadUseCase = this._container.getInstance(DetailThreadUseCase.name);
    const detailThread = await detailThreadUseCase.execute(req.params.threadId);
    return h.response({
      status: 'success',
      data: {
        thread: detailThread,
      },
    }).code(200);
  }
}

