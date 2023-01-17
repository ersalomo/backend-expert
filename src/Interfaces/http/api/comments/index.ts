import {Server} from '@hapi/hapi';
import CommentHandler from './handler';
import {routes} from './routes';
import {Container} from 'instances-container';

export const comments = {
  name: 'comments',
  register: async (server:Server, container:Container) => {
    const commentHandler = new CommentHandler(container);
    server.route(routes(commentHandler));
  },
};

