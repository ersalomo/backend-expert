const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const DetailThreadUseCase = require('../../../../Applications/use_case/DetailThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreads = this.getThreads.bind(this);
  }

  async postThreadHandler(request, h) {
    const {id: owner} = request.auth.credentials;
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    request.payload.owner = owner;
    const addedThread = await addThreadUseCase.execute(request.payload);
    const response = h.response({
      status: 'success',
      data: {addedThread},
    });
    response.code(201);
    return response;
  }

  async getThreads(req, h) {
    const detailThreadUseCase = this._container.getInstance(DetailThreadUseCase.name);
    const detailThread = await detailThreadUseCase.execute(req.params.threadId);
    if (detailThread) {
      return h.response({
        status: 'success',
        data: {
          thread: detailThread,
        },
      }).code(200);
    }
    return h.response({
      status: 'success',
      message: 'Data not found',
    }).code(404);
  }
}

module.exports = ThreadsHandler;
