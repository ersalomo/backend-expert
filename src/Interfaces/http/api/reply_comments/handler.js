class ReplyCommentHandler {
  constructor(container) {
    this._container = container;

    this.addPostReplayComment = this.addPostReplayComment.bind(this);
    this.deletePostReplayComment = this.deletePostReplayComment.bind(this);
  }

  async addPostReplayComment(req, res) {
  }

  async deletePostReplayComment(req, res) {

  }
}
module.exports = ReplyCommentHandler;
