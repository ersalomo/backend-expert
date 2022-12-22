
class AddThread {
  // constructor(payload) {
  constructor({id, title, body}) {
    // this.#verifyPayload(payload);
    // const {title, body} = payload;
    this.id = id || 'error id users';
    this.title = title || 'error title';
    this.body = body || 'errpr boyd';
  }
  _verifyPayload({id, title, body}) {}
};

module.exports = AddThread;
