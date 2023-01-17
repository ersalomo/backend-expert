import {Server} from '@hapi/hapi'
import UserHandler from './handler'
import {routes} from './routes'
import {Container} from 'instances-container';

export const users = {
  name: 'users',
  register: async (server:Server, container:Container):Promise<void> => {
    const usersHandler = new UserHandler(container)
    server.route(routes(usersHandler))
  },
}
