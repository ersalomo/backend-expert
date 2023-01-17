import {Server} from '@hapi/hapi';
import ThreadsHandler from './handler';
import {routes} from './routes';
import {Container} from 'instances-container';

export const threads = {
  name: 'threads',
  register: async (server:Server, container:Container) => {
    const threadsHandler = new ThreadsHandler(container);
    server.route(routes(threadsHandler));
  },
};
