import {Server} from '@hapi/hapi';
import {routes} from './routes';
// import {Container} from 'instances-container';
import AuthenticationsHandler from './handler';

export const authentications = {
  name: 'authentications',
  register: async (server:Server, {container}:any) => {
    const authenticationsHandler = new AuthenticationsHandler(container);
    server.route(routes(authenticationsHandler));
  },
};
