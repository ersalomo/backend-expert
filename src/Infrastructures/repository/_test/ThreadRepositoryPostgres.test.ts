import {ThreadTableTestHelper} from '../../../../tests/ThreadTableTestHelper';
import {UsersTableTestHelper} from '../../../../tests/UsersTableTestHelper';
import {CommentTableTestHelper} from '../../../../tests/CommentTableTestHelper';
import {ReplayTableTestHelper} from '../../../../tests/ReplayTableTestHelper';
import {pool} from '../../database/postgres/pool';
import AddThread from '../../../Domains/threads/entities/AddThread';
import AddedThread from '../../../Domains/threads/entities/AddedThread';
import ThreadRepositoryPostgres from '../../repository/ThreadRepositoryPostgres';
import NotFoundError from '../../../Commons/exceptions/NotFoundError';

describe('ThreadRepositoryPostgres', ()=>{
  beforeAll(async () => {
    await UsersTableTestHelper.addUser({});
  });

  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
    await CommentTableTestHelper.cleanTable();
    await ReplayTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('addThread function', () => {
    it('should persist add thread and return added thread correctly', async () => {
      // Arrange
      const addThread = new AddThread({
        owner: 'user-123',
        title: 'Di atas Awan',
        body: 'Ku ingin terbang',
      });

      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      // Action
      await threadRepositoryPostgres.addThread(addThread);

      // Assert
      const thread = await ThreadTableTestHelper.findThreadById(
          'thread-123',
      );
      expect(thread).toHaveLength(1);
    });

    it('should return added thread correctly', async () => {
      // Arrange
      const addThread = new AddThread({
        owner: 'user-123',
        title: 'Di atas Awan',
        body: 'Ku ingin terbang',
      });

      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
          pool, fakeIdGenerator,
      );

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(addThread);

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

  describe('checkExistsThreadById function', () => {
    it('should throw NotFoundError when thread does\'nt exist', async () => {
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
    it('should throw NotFoundError when user not found', () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      return expect(threadRepositoryPostgres.getDetailThreadById(''))
          .rejects
          .toThrowError(NotFoundError);
    });
    it('should return thread details correctly', async () => {
      // Arrange
      await ThreadTableTestHelper.addThread({});

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
          pool, {});

      // Action
      const threadDetails = await threadRepositoryPostgres.getDetailThreadById('thread-123');

      // Assert
      expect(threadDetails).toHaveProperty('id', 'thread-123');
      expect(threadDetails).toHaveProperty('title', 'New Thread');
      expect(threadDetails).toHaveProperty('body', 'New body');
      expect(threadDetails).toHaveProperty('username', 'dicoding');
      expect(threadDetails).toHaveProperty('date');
    });
  });
});
