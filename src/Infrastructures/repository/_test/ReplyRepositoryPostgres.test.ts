import {ThreadTableTestHelper} from '../../../../tests/ThreadTableTestHelper';
import {UsersTableTestHelper} from '../../../../tests/UsersTableTestHelper';
import {CommentTableTestHelper} from '../../../../tests/CommentTableTestHelper';
import {ReplayTableTestHelper} from '../../../../tests/ReplayTableTestHelper';
import {pool} from '../../database/postgres/pool';
import AddReply from '../../../Domains/reply_comments/entities/AddReply';
import AddedReply from '../../../Domains/reply_comments/entities/AddedReply';
import ReplyRepositoryPostgres from '../ReplyRepositoryPostgres';
import NotFoundError from '../../../Commons/exceptions/NotFoundError';
import ForbiddenError from '../../../Commons/exceptions/ForbiddenError';

describe('ReplyRepositoryPostgres', ()=>{
  beforeAll(async ()=> {
    await UsersTableTestHelper.addUser({});
  });
  afterEach( async ()=> {
    await ThreadTableTestHelper.cleanTable();
    await CommentTableTestHelper.cleanTable();
    await ReplayTableTestHelper.cleanTable();
  });

  afterAll(async ()=> {
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('verifyExistsReplyById function', () => {
    it('should throw NotFoundError when reply is not exist', async () => {
    // Arrange
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(replyRepositoryPostgres.verifyExistsReplyById('reply-123')).rejects.toThrow(NotFoundError);
    });

    it('should not throw NotFoundError when reply exists', async () => {
    // Arrange
      await ThreadTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({});
      await ReplayTableTestHelper.addReply({});

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
          pool, {});

      // Action and Assert
      await expect(replyRepositoryPostgres.verifyExistsReplyById('reply-123')).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('addReplyComment function', () => {
    beforeEach(async () => {
      await ThreadTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({});
    });

    it('should persist add reply', async () => {
    // Arrange
      const addReply = new AddReply({
        commentId: 'comment-123',
        content: 'Wow Wok',
        owner: 'user-123',
      });

      const fakeIdGenerator = () => '123'; // stub
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
          pool, fakeIdGenerator);

      // Action
      await replyRepositoryPostgres.addReplyComment(addReply);

      // Assert
      const reply = await ReplayTableTestHelper.findReplyById('reply-123');
      expect(reply).toHaveLength(1);
      expect(reply[0]).toHaveProperty('id', 'reply-123');
      expect(reply[0]).toHaveProperty('id_comment', 'comment-123');
      expect(reply[0]).toHaveProperty('content', 'Wow Wok');
      expect(reply[0]).toHaveProperty('id_user', 'user-123');
      expect(reply[0]).toHaveProperty('is_deleted', false);
      expect(reply[0]).toHaveProperty('date');
    });

    it('should return added reply correctly', async () => {
      // Arrange
      const addReply = new AddReply({
        commentId: 'comment-123',
        content: 'Hai, apa kabar',
        owner: 'user-123',
      });

      const fageIdGenerator = () => '123'; // stub
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fageIdGenerator);

      // Action
      const addedReply = await replyRepositoryPostgres.addReplyComment(addReply);

      // Assert
      expect(addedReply).toStrictEqual(new AddedReply({
        id: 'reply-123',
        content: 'Hai, apa kabar',
        owner: 'user-123',
      }));
    });
  });

  describe('getRepliesByThreadId', () => {
    beforeEach(async () => {
      await ThreadTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({});
    });

    it('should return empty replies if there is no replies in the thread', async () => {
    // Arrange
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      // Action
      const replies = await replyRepositoryPostgres.getRepliesByThreadId('thread-123');

      // Assert
      expect(replies).toHaveLength(0);
    });

    it('should return replies correctly', async () => {
    // Arrange
      await ReplayTableTestHelper.addReply({});

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      // Action
      const replies = await replyRepositoryPostgres.getRepliesByThreadId('thread-123');

      // Assert
      expect(replies).toHaveLength(1);
      expect(replies[0]).toHaveProperty('id', 'reply-123');
      expect(replies[0]).toHaveProperty('is_deleted', false);
      expect(replies[0]).toHaveProperty('id_comment', 'comment-123');
      expect(replies[0]).toHaveProperty('content', 'Wow Wok');
      expect(replies[0]).toHaveProperty('username', 'dicoding');
      expect(replies[0]).toHaveProperty('date');
    });
  });

  describe('deleteReplyComment function', () => {
    beforeEach(async () => {
      await ThreadTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({});
      await ReplayTableTestHelper.addReply({});
    });

    it('should persist delete reply detail', async () => {
    // Arrange
      const deleteReply = {
        replyId: 'reply-123',
        owner: 'user-123',
      };

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(replyRepositoryPostgres.deleteReplyComment(deleteReply),
      ).resolves.not.toThrow(ForbiddenError);
      const reply = await ReplayTableTestHelper.findReplyById('reply-123',
      );
      expect(reply).toHaveLength(1);
      expect(reply[0]).toHaveProperty('is_deleted', true);
    });

    it('should throw ForbiddenError when the access user is not the owner', async () => {
    // Arrange
      const deleteReply = {
        replyId: 'reply-123',
        owner: 'user-124',
      };

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(replyRepositoryPostgres.deleteReplyComment(deleteReply)).rejects.toThrow(ForbiddenError);
      const reply = await ReplayTableTestHelper.findReplyById('reply-123');
      expect(reply).toHaveLength(1);
    });
  });
});
