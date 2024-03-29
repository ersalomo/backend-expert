const ServerTestHelper = require('../../../../tests/ServerTestHelper');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const ReplayTableTestHelper = require('../../../../tests/ReplayTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../../Infrastructures/container');
const createServer = require('../../../Infrastructures/http/createServer');
const pool = require('../../database/postgres/pool');

describe('/replies endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadTableTestHelper.cleanTable();
  });

  beforeEach(async () => {
    await ReplayTableTestHelper.cleanTable();
  });

  describe('/when replies /POST /threads/{threadId}/comments/{commentId}/replies', () => {
    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const reqPayload = {
        content: '',
      };
      const server = await createServer(container);
      const accessToken = await ServerTestHelper.getAccessToken();
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/{threadId}/comments/{commentId}/replies',
        payload: reqPayload,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      const responseJson = JSON.parse(response.payload);
      // Assert
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat reply baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const reqPayload = {
        content: ['hallo'],
      };
      const server = await createServer(container);
      const accessToken = await ServerTestHelper.getAccessToken();
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/{threadId}/comments/{commentId}/replies',
        payload: reqPayload,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      const responseJson = JSON.parse(response.payload);
      // Assert
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat reply baru karena tipe data tidak sesuai');
    });

    it('should response 401 when acess token not given', async () => {
      // Assert
      const reqPayload = {
        content: 'New replies',
      };
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/{threadId}/comments/{commentId}/replies',
        payload: reqPayload,
      });
      const responseJson = JSON.parse(response.payload);
      // Assert
      expect(responseJson.statusCode).toEqual(401);
      expect(responseJson.error).toEqual('Unauthorized');
    });

    it('should reponse 404 when comment is not found', async () => {});

    it('should response 201 when reply added correctly', async () => {
      // Arange
      const reqPayload = {
        content: 'New reply',
      };
      const accessToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);
      const {id: threadId} = await ThreadTableTestHelper.addThread({});
      const {id: commentId} = await CommentTableTestHelper.addComment({});
      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments/${commentId}/replies`,
        payload: reqPayload,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      const responseJson = JSON.parse(response.payload);
      // Assert
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedReply).toBeDefined();
      expect(responseJson.data.addedReply).toHaveProperty('content', 'New reply');
      expect(responseJson.data.addedReply.id).toBeDefined();
      expect(responseJson.data.addedReply.owner).toBeDefined();
    });
  });
  describe('/when replies /DELETE /threads/{threadId}/comments/{commentId}/replies{replyId}', () => {
    it('should reponse 404 when reply is not found', async () => {
      // Arrange
      const accessToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      const responseJson = JSON.parse(response.payload);
      // Assert
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Reply tidak ditemukan!');
    });

    it('should response 200 and persisted delete comment', async () => {
      // Arrange
      const accessToken = await ServerTestHelper.getAccessToken();
      const {id: threadId} = await ThreadTableTestHelper.addThread({});
      const {id: commentId} = await CommentTableTestHelper.addComment({});
      const {id: replyId} = await ReplayTableTestHelper.addReply({});
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      const responseJson = JSON.parse(response.payload);
      // Assert
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });

    it('should response 403 when reply is not mine to user', async () => {
      // Arrange
      const accessToken = await ServerTestHelper.getAccessToken('user-124');
      const server = await createServer(container);

      await UsersTableTestHelper.addUser({});
      const {id: threadId} = await ThreadTableTestHelper.addThread({});
      const {id: commentId} = await CommentTableTestHelper.addComment({});
      const {id: replyId} = await ReplayTableTestHelper.addReply({});
      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      const responseJson = JSON.parse(response.payload);
      // Assert
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Anda tidak pemilik pesan ini!');
    });
  });
});
