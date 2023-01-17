const ReplyCommentHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'replies',
  register: (server, {container}) => {
    const replyCommentHandler = new ReplyCommentHandler(container);
    server.route(routes(replyCommentHandler));
  },
};
