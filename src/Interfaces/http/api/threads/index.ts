import {Server} from '@hapi/hapi';
import ThreadsHandler from './handler';
import {routes} from './routes';

export const threads= {
  name: 'threads',
  register: async (server:Server, params:{container:any}) => {
    const threadsHandler = new ThreadsHandler(params.container);
    server.route(routes(threadsHandler));
  },
};
