const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
class ThreadsHandler {
  #container;
  constructor(container) {
    this.#container = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const {userid} = request.auth.credentials;
    const addThreadUseCase = this.#container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        'addedThread': {
          addedThread,
        },
      },
    });
    response.code(201);
    return response;
  }
}
module.exports = ThreadsHandler;
