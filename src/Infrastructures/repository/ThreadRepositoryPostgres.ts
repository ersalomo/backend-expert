import ThreadRepository from '../../Domains/threads/ThreadRepository';
import AddedThread from '../../Domains/threads/entities/AddedThread';
import AddThread from '../../Domains/threads/entities/AddThread';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import {Pool} from 'pg';

export default class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(private _pool:Pool, private _idGenerator:any) {
    super()
  }

  async checkExistsThreadById(idThread: string):Promise<void> {
    const query = {
      text: 'SELECT id from threads WHERE id = $1',
      values: [idThread],
    };
    const result = await this._pool.query(query);
    if (result.rowCount < 1) {
      throw new NotFoundError('Thread tidak ditemukan');
    }
  }

  async addThread(registerThread:AddThread):Promise<AddedThread> {
    const {owner, title, body} = registerThread;
    const id = `thread-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, title, user_id as owner',
      values: [id, owner, title, body],
    };
    const result = await this._pool.query(query);
    return new AddedThread({...result.rows[0]});
  }

  async getDetailThreadById(idThread:string) {
    const query = {
      text: `SELECT threads.id, threads.title, threads.body, threads.date, users.username
             FROM threads INNER JOIN users
             ON threads.user_id = users.id where threads.id = $1`,
      values: [idThread],
    };
    const resultThread = await this._pool.query(query);
    if (!resultThread.rowCount) {
      throw new NotFoundError('Thread tidak ditemukan!');
    }
    return {...resultThread.rows[0]};
  }
}


