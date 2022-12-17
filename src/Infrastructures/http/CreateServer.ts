import Hapi, {Server, Request, IReply} from '@hapi/hapi';

const createServer = async ():Promise<Server> => {
  const server:Server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register([
    {
      plugin: users,
      options: {container},
    },
  ]);

  server.ext('onPreResponse', (req:Request, res:Response)=> {
    const {response} = req;
  });

  return server;
};
export default createServer;

