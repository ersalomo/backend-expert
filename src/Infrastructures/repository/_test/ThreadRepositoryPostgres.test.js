const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const pool = require('../../database/postgres/pool');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadRepositoryPostgres = require('../../repository/ThreadRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('ThreadRepositoryPostgres', ()=>{
  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });
  describe('addThread function', () => {
    it('should persist add thread and return added thread correctly', async () => {
      // Arrange
      const addThread = new AddThread({
        title: 'Di atas Awan',
        body: 'Ku ingin terbang',
        owner: 'user-123',
      });

      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
          pool,
          fakeIdGenerator,
      );
      // Action
      await threadRepositoryPostgres.addThread(addThread);

      // Assert
      const users = await ThreadTableTestHelper.findThreadById(
          'thread-123',
      );
      expect(users).toHaveLength(1);
    });

    it('should return added thread correctly', async () => {
      // Arrange
      const addThread = new AddThread({
        title: 'Di atas Awan',
        body: 'Ku ingin terbang',
        owner: 'user-123',
      });

      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
          pool, fakeIdGenerator,
      );

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(
          addThread,
      );

      // Assert
      expect(addedThread).toStrictEqual(
          new AddedThread({
            id: 'thread-123',
            title: 'Di atas Awan',
            owner: 'user-123',
          }),
      );
    });
  });

  describe('verifyThreadExist function', () => {
    it('should throw NotFoundError when thread is not exist', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
          pool, {},
      );

      // Action and Assert
      await expect(
          threadRepositoryPostgres.checkExistsThreadById('thread-123'),
      ).rejects.toThrow(NotFoundError);
    });

    it('should not throw NotFoundError when thread is not exist', async () => {
      // Arrange
      await ThreadTableTestHelper.addThread({});
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
          pool,
          {},
      );

      // Action and Assert
      await expect(
          threadRepositoryPostgres.checkExistsThreadById('thread-123'),
      ).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('getThreadDetailById function', () => {
    it('should return thread details correctly', async () => {
      // Arrange
      await ThreadTableTestHelper.addThread({});
      const getThreadDetail = new GetThreadDetail({
        threadId: 'thread-123',
      });

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
          pool,
          {},
      );

      // Action
      const threadDetails =
          await threadRepositoryPostgres.getDetailThreadById(
              getThreadDetail,
          );

      // Assert
      expect(threadDetails).toHaveProperty('id', 'thread-123');
      expect(threadDetails).toHaveProperty('title', 'Di atas Awan');
      expect(threadDetails).toHaveProperty('body', 'Ku ingin terbang');
      expect(threadDetails).toHaveProperty('username', 'dicoding');
      expect(threadDetails).toHaveProperty('date');
    });
  });
});
