const pool = require('../../database/postgres/pool');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');
const createServer = require('../../../Infrastructures/http/createServer');
const container = require('../../../Infrastructures/container');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ReplayTableTestHelper = require('../../../../tests/ReplayTableTestHelper');
const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');


describe('/threads endpoint', ()=> {
  afterAll(async ()=>{
    await pool.end();
  });
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadTableTestHelper.cleanTable();
  });


  describe('when threads /POST threads', ()=> {
    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const reqPayload = {
        title: 'New Thread',
        body: '',
      };
      const accessToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: reqPayload,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const reqPayload = {
        title: 'New Thread',
        body: [],
      };
      const accesToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: reqPayload,
        headers: {
          Authorization: 'Bearer ' + accesToken,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena tipe data tidak sesuai');
    });

    it('should response 401 when acess token not given', async () => {
      const reqPayload = {
        title: 'New Thread',
        body: 'New Body',
      };
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: reqPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(responseJson.statusCode).toEqual(401);
      expect(responseJson.error).toEqual('Unauthorized');
    });

    it('should response 201 when thread added correctly', async () => {
      // Arrange
      const reqPayload = {
        title: 'New Thread',
        body: 'New Body',
      };
      const accessToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: reqPayload,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });

      const responseJson = JSON.parse(response.payload);
      // Assert
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedThread).toBeDefined();
      expect(responseJson.data.addedThread).toHaveProperty('title', reqPayload.title);
      expect(responseJson.data.addedThread.id).toBeDefined();
      expect(responseJson.data.addedThread.owner).toBeDefined();
    });
  });

  describe('when threads /GET', ()=>{
    it('should response 404 when thread is not found', async () => {
      // Arrange & Action
      const server = await createServer(container);
      const response = await server.inject({
        method: 'GET',
        url: '/threads/thread-123',
      });

      const responseJson = JSON.parse(response.payload);
      // Assert
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Thread tidak ditemukan!');
    });

    it('should response 200 and persisted thread detail without comment', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});
      const {id: threadId} = await ThreadTableTestHelper.addThread({});
      // Action
      const server = await createServer(container);
      const response = await server.inject({
        method: 'GET',
        url: '/threads/'+threadId,
      });

      const responseJson = JSON.parse(response.payload);
      // Assert
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.thread).toBeDefined();
      expect(responseJson.data.thread).toHaveProperty('id', 'thread-123');
      expect(responseJson.data.thread).toHaveProperty('title', 'New Thread');
      expect(responseJson.data.thread).toHaveProperty('body', 'New body');
      expect(responseJson.data.thread.date).toBeDefined();
      expect(responseJson.data.thread).toHaveProperty('username', 'dicoding');
      expect(responseJson.data.thread.comments).toBeDefined();
      expect(responseJson.data.thread.comments).toHaveLength(0);
    });

    it('should response 200 and persisted thread detail without replies', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});
      const {id: threadId} = await ThreadTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({});
      // Action
      const server = await createServer(container);
      const response = await server.inject({
        method: 'GET',
        url: '/threads/'+threadId,
      });

      const responseJson = JSON.parse(response.payload);
      // Assert
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.thread).toBeDefined();
      expect(responseJson.data.thread).toHaveProperty('id', 'thread-123');
      expect(responseJson.data.thread).toHaveProperty('title', 'New Thread');
      expect(responseJson.data.thread).toHaveProperty('body', 'New body');
      expect(responseJson.data.thread.date).toBeDefined();
      expect(responseJson.data.thread).toHaveProperty('username', 'dicoding');
      expect(responseJson.data.thread.comments).toBeDefined();
      expect(responseJson.data.thread.comments).toHaveLength(1);
      expect(responseJson.data.thread.comments[0].id).toBeDefined();
      expect(responseJson.data.thread.comments[0].username).toBeDefined();
      expect(responseJson.data.thread.comments[0]).toHaveProperty('content', 'Gak tau kok nanya saya');
      expect(responseJson.data.thread.comments[0].replies).toBeDefined();
      expect(responseJson.data.thread.comments[0].replies).toHaveLength(0);
    });

    it('should response 200 and persisted thread detail', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});
      const {id: threadId} = await ThreadTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({});
      await ReplayTableTestHelper.addReply({});
      // Action
      const server = await createServer(container);
      const response = await server.inject({
        method: 'GET',
        url: '/threads/' + threadId,
      });

      const responseJson = JSON.parse(response.payload);
      // Assert

      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.thread).toBeDefined();
      expect(responseJson.data.thread).toHaveProperty('id', 'thread-123');
      expect(responseJson.data.thread).toHaveProperty('title', 'New Thread');
      expect(responseJson.data.thread).toHaveProperty('body', 'New body');
      expect(responseJson.data.thread.date).toBeDefined();
      expect(responseJson.data.thread).toHaveProperty('username', 'dicoding');
      expect(responseJson.data.thread.comments).toBeDefined();
      expect(responseJson.data.thread.comments).toHaveLength(1);
      expect(responseJson.data.thread.comments[0].id).toBeDefined();
      expect(responseJson.data.thread.comments[0].username).toBeDefined();
      expect(responseJson.data.thread.comments[0]).toHaveProperty('content', 'Gak tau kok nanya saya');

      expect(responseJson.data.thread.comments[0].replies).toBeDefined();
      expect(responseJson.data.thread.comments[0].replies).toHaveLength(1);
      expect(responseJson.data.thread.comments[0].replies[0].id).toBeDefined();
      expect(responseJson.data.thread.comments[0].replies[0].username).toBeDefined();
      expect(responseJson.data.thread.comments[0].replies[0]).toHaveProperty('content', 'Wow Wok');
    });
  });
});
