const ServerTestHelper = require('../../../../tests/ServerTestHelper');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../../Infrastructures/container');
const createServer = require('../../../Infrastructures/http/createServer');
const pool = require('../../database/postgres/pool');

describe('/likes endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadTableTestHelper.cleanTable();
  });

  describe('/when replies /POST /threads/{threadId}/comments/{commentId}/likes', () => {
    it('should response 200 when user liked a comment', async () => {
      // Arrange
      const accessToken = await ServerTestHelper.getAccessToken();
      const { id: threadId } = await ThreadTableTestHelper.addThread({});
      const { id: commentId } = await CommentTableTestHelper.addComment({});
      const payload = {
        idComment: 'comment-123',
        owner: 'user-123',
      };
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments/${commentId}/likes`,
        payload: payload,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      const responseJson = JSON.parse(response.payload);
      // Assert
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });
  });
});
