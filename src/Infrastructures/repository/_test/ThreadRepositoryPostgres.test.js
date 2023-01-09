const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const pool = require('../../database/postgres/pool');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadRepositoryPostgres = require('../../repository/ThreadRepositoryPostgres');
// const InvariantError = require('../../../Commons/exceptions/InvariantError');

describe('ThreadRepositoryPostgres', ()=>{
  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', async ()=>{
    // Arrange
    const addThread = new AddThread({
      title: 'New Title Thread',
      body: 'Hy ini body',
    });
    const fakeIdGenerator = () => '1234'; // stub!
    const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

    // Action
    const addedThread = await threadRepositoryPostgres.addThread(addThread);

    // Assert
    expect(addedThread).toStrictEqual(new AddedThread({
      id: 'thread-1234',
      userId: '',
      title: 'New Title Thread',
      body: 'Hy ini body',
    }));
  });
});
