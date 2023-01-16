/* istanbul ignore file */
const Jwt = require('@hapi/jwt');
const UsersTableTestHelper = require('./UsersTableTestHelper');

const ServerTesHelper = {
  getAccessToken: async (id = 'user-123', username = 'Dicoding') => {
    const requestPayload = {
      id: id,
      username: username,
      fullname: 'Dicoding Indonesia',
      password: 'dicoding',
    };
    await UsersTableTestHelper.addUser(requestPayload);
    return Jwt.token.generate(requestPayload, process.env.ACCESS_TOKEN_KEY);
  },
};

module.exports = ServerTesHelper;
