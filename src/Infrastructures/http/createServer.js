const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const ClientError = require('../../Commons/exceptions/ClientError');
const users = require('../../Interfaces/http/api/users');
const authentications = require('../../Interfaces/http/api/authentications');
const threads = require('../../Interfaces/http/api/threads');
const comments = require('../../Interfaces/http/api/comments');
const replies = require('../../Interfaces/http/api/reply_comments');

const createServer = async (container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });
  //
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('forumapi_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });
  //

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

  server.ext('onPreResponse', (req, h) => {
    const {response} = req;

    if (response instanceof Error) {
      console.log(response);
      const translatedError = DomainErrorTranslator.translate(response);

      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
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

module.exports = createServer;
