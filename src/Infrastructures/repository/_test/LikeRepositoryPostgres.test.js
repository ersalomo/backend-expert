/* eslint-disable indent */
/* eslint-disable comma-dangle */
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');
const pool = require('../../database/postgres/pool');
const AddLike = require('../../../Domains/likes/entities/AddLike');
const AddedLike = require('../../../Domains/likes/entities/AddedLike');
const LikeRepositoryPostgres = require('../../repository/LikeRepositoryPostgres');

describe('LikeRepositoryPostgres', () => {
  beforeAll(async () => {
    await UsersTableTestHelper.addUser({});
  });

  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
    await CommentTableTestHelper.cleanTable();
    await LikesTableTestHelper.cleanTable();
  });
  beforeEach(async () => {
    await ThreadTableTestHelper.addThread({});
    await CommentTableTestHelper.addComment({});
  });

  afterAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('likeComment function', () => {
    it('should persist like comment correcly', async () => {
      // Arrange
      const addLike = new AddLike({
        idComment: 'comment-123',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub
      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedLike = await likeRepositoryPostgres.likeComment(addLike);

      // Assert
      expect(addedLike).toStrictEqual(
        new AddedLike({
          id: 'like-123',
          id_comment: 'comment-123',
          owner: 'user-123',
        })
      );
    });
  });

  describe('deleteLikeComment function', () => {
    it('should persist delete like comment correcly', async () => {
      // Arrange
      const addLike = new AddLike({
        idComment: 'comment-123',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub
      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await likeRepositoryPostgres.deleteLikeComment(addLike);

      // Assert
      const likeComment = await LikesTableTestHelper.findLikeCommentById('like-123');
      expect(likeComment).toHaveLength(0);
    });
  });

  describe('isLiked function', () => {
    it('should return true when like comment is liked', async () => {
      // Arrange
      await LikesTableTestHelper.addLikeComment({});
      const addLike = new AddLike({
        idComment: 'comment-123',
        owner: 'user-123',
      });
      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, {});
      // Action
      const isLiked = await likeRepositoryPostgres.isLiked(addLike);

      // Assert
      expect(isLiked).toEqual(true);
    });

    it("should return false when like comment isn't liked", async () => {
      // Arrange
      const addLike = new AddLike({
        idComment: 'comment-123',
        owner: 'user-123',
      });
      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, {});
      // Action
      const isLiked = await likeRepositoryPostgres.isLiked(addLike);

      // Assert
      expect(isLiked).toEqual(false);
    });
  });
});
