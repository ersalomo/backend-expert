const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ForbiddenError = require('../../../Commons/exceptions/ForbiddenError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const DeleteComment = require('../../../Domains/comments/entities/DeleteComment');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');

describe('CommentRepositoryPostgres', () => {
  afterAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  beforeAll(async () => {
    await UsersTableTestHelper.addUser({});
  });

  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
    await CommentTableTestHelper.cleanTable();
  });

  describe('verifyExistsCommentById function', () => {
    it("should throw NotFoundError when comment doesn't exist", async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action and Assert
      expect(commentRepositoryPostgres.verifyExistsCommentById('comment-1231')).rejects.toThrow(NotFoundError);
    });

    it('should not throw NotFoundError when comment is exist', async () => {
      // Arrange
      await ThreadTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({});
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(commentRepositoryPostgres.verifyExistsCommentById('comment-123')).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('addComment function', () => {
    beforeEach(async () => {
      await ThreadTableTestHelper.addThread({});
    });

    it('should persist add comment', async () => {
      // Arrange
      const addComment = new AddComment({
        owner: 'user-123',
        threadId: 'thread-123',
        content: 'Tentang cerita dulu',
      });

      const fakeIdGenerator = () => '123'; // stub
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await commentRepositoryPostgres.addComment(addComment);

      // Assert
      const comment = await CommentTableTestHelper.findCommentById('comment-123');
      expect(comment).toHaveLength(1);
      expect(comment[0]).toHaveProperty('id', 'comment-123');
      expect(comment[0]).toHaveProperty('thread_id', 'thread-123');
      expect(comment[0]).toHaveProperty('content', 'Tentang cerita dulu');
      expect(comment[0]).toHaveProperty('user_id', 'user-123');
      expect(comment[0]).toHaveProperty('is_deleted', false);
    });

    it('should return added comment correctly', async () => {
      // Arrange
      const addComment = new AddComment({
        threadId: 'thread-123',
        content: 'Hai, apa kabar',
        owner: 'user-123',
      });

      const fageIdGenerator = () => '123'; // stub
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fageIdGenerator);

      // Action
      const addedComment = await commentRepositoryPostgres.addComment(addComment);

      // Assert
      expect(addedComment).toStrictEqual(
        new AddedComment({
          id: 'comment-123',
          content: 'Hai, apa kabar',
          owner: 'user-123',
        })
      );
    });
  });

  describe('getCommentsByThreadId', () => {
    beforeEach(async () => {
      await ThreadTableTestHelper.addThread({});
    });

    it('should return empty comments if there is no comment in the thread', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      const comments = await commentRepositoryPostgres.getCommentsByThreadId('thread-123');

      // Assert
      expect(comments).toHaveLength(0);
    });

    it('should return comments correctly', async () => {
      // Arrange
      const { date } = await CommentTableTestHelper.addComment({});

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      const comments = await commentRepositoryPostgres.getCommentsByThreadId('thread-123');

      // Assert
      expect(comments).toHaveLength(1);
      expect(comments[0]).toHaveProperty('id', 'comment-123');
      expect(comments[0]).toHaveProperty('content', 'Gak tau kok nanya saya');
      expect(comments[0]).toHaveProperty('username', 'dicoding');
      expect(comments[0]).toHaveProperty('is_deleted', false);
      expect(comments[0]).toHaveProperty('date', date);
    });
  });

  describe('deleteCommentById function', () => {
    beforeEach(async () => {
      await ThreadTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({});
    });

    it('should persist delete comment', async () => {
      // Arrange
      const deleteComment = new DeleteComment({
        threadId: 'thread-123',
        commentId: 'comment-123',
        owner: 'user-123',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(commentRepositoryPostgres.deleteComment(deleteComment)).resolves.not.toThrow(ForbiddenError);
      const comment = await CommentTableTestHelper.findCommentById('comment-123');
      expect(comment).toHaveLength(1);
      expect(comment[0]).toHaveProperty('is_deleted', true);
    });

    it('should throw ForbiddenError when the access user is not the owner', async () => {
      // Arrange
      const deleteComment = new DeleteComment({
        threadId: 'thread-123',
        commentId: 'comment-123',
        owner: 'user-124',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(commentRepositoryPostgres.deleteComment(deleteComment)).rejects.toThrow(ForbiddenError);
      const comment = await CommentTableTestHelper.findCommentById('comment-123');
      expect(comment).toHaveLength(1);
    });
  });
});
