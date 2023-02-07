/* eslint-disable guard-for-in */
const pool = require('../src/Infrastructures/database/postgres/pool');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
require('dotenv').config();

const fakerGenerate = async () => {
  const usersId = [];
  for (const _ in [...Array(10).keys()]) {
    const id = 'user-' + nanoid(16) + _;
    const fullname = nanoid(5);
    const username = 'user-' + Math.ceil(Math.random() * 100) + nanoid(5);
    const password = await bcrypt.hash('ersalomo', 10);
    const query = {
      text: 'INSERT INTO users(id, fullname, username, password) VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, fullname, username, password],
    };
    const result = await pool.query(query);
    usersId.push(result.rows[0].id);
  }
  const threadsId = [];
  for (const _ in [...Array(5).keys()]) {
    const id = 'thread-' + nanoid(16) + _;
    const i = Math.floor(Math.random() * usersId.length);
    const userId = usersId[i];
    const title = nanoid(10);
    const body = nanoid(40);
    const query = {
      text: 'INSERT INTO threads(id, user_id, title, body) VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, userId, title, body],
    };
    const result = await pool.query(query);
    threadsId.push(result.rows[0].id);
  }
  const commentsId = [];
  for (const _ in [...Array(5).keys()]) {
    const id = 'comment-' + nanoid(16) + _;
    const i = Math.floor(Math.random() * usersId.length);
    const iT = Math.floor(Math.random() * threadsId.length);
    const userId = usersId[i];
    const threadId = threadsId[iT];
    const content = nanoid(40);
    const query = {
      text: 'INSERT INTO comments(id, user_id, thread_id, content) VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, userId, threadId, content],
    };
    const result = await pool.query(query);
    commentsId.push(result.rows[0].id);
  }
  for (const _ in [...Array(30).keys()]) {
    const id = 'like-' + nanoid(16) + _;
    const idComment = commentsId[Math.floor(Math.random() * commentsId.length)];
    const userId = usersId[Math.floor(Math.random() * usersId.length)];
    const query = {
      values: [id, idComment, userId],
      text: 'INSERT INTO likes(id, id_comment, id_user) VALUES($1, $2, $3) RETURNING id',
    };
    await pool.query(query);
  }

  await pool.end();
};
fakerGenerate();

Array.from({ length: 10 }).forEach(() => {});
