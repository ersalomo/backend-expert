const routes = require('./routes');
const LikeHandler = require('./handler');

module.exports = {
  name: 'likes',
  async register(server, { container }) {
    const likeHandler = new LikeHandler(container);
    server.route(routes(likeHandler));
  },
};
