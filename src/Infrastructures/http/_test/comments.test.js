const pool = require('../../database/postgres/pool');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');
const createServer = require('../../../Infrastructures/http/createServer');
const container = require('../../../Infrastructures/container');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');

describe('/comments endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadTableTestHelper.cleanTable();
  });
  describe('/when cemments /POST /threads/{threadId}/comments', () => {
    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const reqPayload = {
        content: '',
      };
      const accessToken = await ServerTestHelper.getAccessToken();
      const {id: threadId} = await ThreadTableTestHelper.addThread({});
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: reqPayload,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const reqPayload = {
        content: {},
      };
      const accessToken = await ServerTestHelper.getAccessToken();
      const {id: threadId} = await ThreadTableTestHelper.addThread({});
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: reqPayload,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat comment baru karena tipe data tidak sesuai');
    });

    it('should response 401 when acess token not given', async () => {
    // Arrange
      const reqPayload = {
        content: 'Wow bos',
      };
        //   const threadId = await ThreadTableTestHelper.addThread({});
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/thread-123/comments`,
        payload: reqPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual('Unauthorized');
    });

    it('should response 404 when thread is not found', async () => {
      // Arrange
      const reqPayload = {
        content: 'Wow bos',
      };
        //   const threadId = await ThreadTableTestHelper.addThread({});
      const acessToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/thread-123/comments`,
        payload: reqPayload,
        headers: {
          Authorization: 'Bearer '+ acessToken,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Thread tidak ditemukan!');
    });

    it('should response 201 when comment added correctly', async () => {
      // Arrange
      const reqPayload = {
        content: 'Wow bos',
      };
      const acessToken = await ServerTestHelper.getAccessToken();
      const {id: threadId} = await ThreadTableTestHelper.addThread({});
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: reqPayload,
        headers: {
          Authorization: 'Bearer '+ acessToken,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedComment).toBeDefined();
      expect(responseJson.data.addedComment).toHaveProperty('content', reqPayload.content);
      expect(responseJson.data.addedComment.id).toBeDefined();
      expect(responseJson.data.addedComment.owner).toBeDefined();
    });
  });
  describe('/when commenst /DELETE /threads/{threadId}/comments/{commentId}', () => {
    it('should response 200 and persisted delete comment', async () => {
      // Arrange
      const accessToken = await ServerTestHelper.getAccessToken();
      //   const threadId = await ThreadTableTestHelper.addThread({});
      const {id: threadId} = await ThreadTableTestHelper.addThread({});
      const {id: commentId} = await CommentTableTestHelper.addComment({});

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });

    it('should response 404 when comment is not exist', async () => {
      // Arrange
      const accessToken = await ServerTestHelper.getAccessToken();
      const {id: threadId} = await ThreadTableTestHelper.addThread({});

      const server = await createServer(container);

      // Action

      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/comment-123`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('komentar tidak ditemukan');
    });
  });
});
