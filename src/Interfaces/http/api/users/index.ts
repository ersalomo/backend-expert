import { Server } from '@hapi/hapi'
import UserHandler from './handler'
import { routes } from './routes'

export = {
    name: 'users',
    register:async (server:Server,params:{container:any}):Promise<void> => {
        const usersHandler = new UserHandler(params.container)
        server.route(routes(usersHandler))
    }
}