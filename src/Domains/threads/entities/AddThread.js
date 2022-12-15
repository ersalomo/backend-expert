
module.exports = class AddThread {
  constructor(payload) {
    this.#verifyPayload(payload);
    const {title, body} = payload;

    this.id = id;
    this.title = title;
    this.body = body;
  }
  #verifyPayload({id, title, body}) {}
};
