/* istanbul ignore file */
import * as Jwt from '@hapi/jwt';
import {UsersTableTestHelper} from './UsersTableTestHelper';
import 'dotenv/config';

export const ServerTestHelper = {
  getAccessToken: async (id = 'user-123', username = 'Dicoding'):Promise<string> => {
    const requestPayload = {
      id: id,
      username: username,
      fullname: 'Dicoding Indonesia',
      password: 'dicoding',
    };
    await UsersTableTestHelper.addUser(requestPayload);
    return Jwt.token.generate(requestPayload, process.env['ACCESS_TOKEN_KEY']);
  },
};
