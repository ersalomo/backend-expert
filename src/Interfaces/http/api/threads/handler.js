
class ThreadsHandler {
  constructor(container) {
    this._container = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const addThread = 'd';
    const response = h.response({
      status: 'success',
      data: {
        'addedThread': {},
      },
    });
    response.code(201);
    return response;
  }
}
module.exports = ThreadsHandler;
