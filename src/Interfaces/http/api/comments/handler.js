
class CommentHandler {
  constructor(container) {
    this._container = container;
    this.postAddComment = this.postAddComment.bind(this);
  }

  async postAddComment(request, h) {
  }
}
module.exports = CommentHandler;
