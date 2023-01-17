import {Server, Request, ResponseToolkit} from '@hapi/hapi';
import {Container} from 'instances-container';
import Jwt from '@hapi/jwt';
import {DomainErrorTranslator} from '../../Commons/exceptions/DomainErrorTranslator';
import ClientError from '../../commons/exceptions/ClientError';
import {authentications} from '../../Interfaces/http/api/authentications';
import {users} from '../../Interfaces/http/api/users';
import {threads} from '../../Interfaces/http/api/threads';
import {comments} from '../../Interfaces/http/api/comments';
import {replies} from '../../Interfaces/http/api/reply_comments';

export const createServer = async (container:Container):Promise<Server> => {
  const server:Server = new Server({
    host: process.env.HOST,
    port: process.env.PORT,
  });
  await server.register([
    {plugin: Jwt},
  ]);
  server.auth.strategy('forumapi_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts:any) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });
  await server.register([
    {
      plugin: users,
      options: {container},
    },
    {
      plugin: authentications,
      options: {container},
    },
    {
      plugin: threads,
      options: {container},
    },
    {
      plugin: comments,
      options: {container},
    },
    {
      plugin: replies,
      options: {container},
    },
  ]);

  server.ext('onPreResponse', (req:Request, h:ResponseToolkit )=> {
    const {response} = req;
    if (response instanceof ClientError) {
      console.log(response);
      const translatedError = DomainErrorTranslator.translate(response);

      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode!!);
        return newResponse;
      }
      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!translatedError.isServer) {
        return h.continue;
      }
      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
        response,
      });
      newResponse.code(500);
      return newResponse;
    }
    return h.continue;
  });
  return server;
};

