import InvariantError from '../../Commons/exceptions/InvariantError';
import RegisteredUser from '../../Domains/users/entities/RegisteredUser';
import RegisterUser from '../../Domains/users/entities/RegisterUser';
import UserRepository from '../../Domains/users/UserRepository';
import {Pool} from 'pg';

export default class UserRepositoryPostgres extends UserRepository {
  constructor(private _pool:Pool, private _idGenerator:any) {
    super()
  }
  async verifyAvailableUsername(username:string) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('username tidak tersedia');
    }
  }

  async getPasswordByUsername(username:string) {
    const query = {
      text: 'SELECT password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('username tidak ditemukan');
    }
    return result.rows[0].password;
  }

  async getIdByUsername(username:string) {
    const query = {
      text: 'SELECT id FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('user tidak ditemukan');
    }
    return result.rows[0].id;
  }

  async addUser(registerUser:RegisterUser): Promise<RegisteredUser> {
    const {username, password, fullname} = registerUser;
    const id = `user-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, username, fullname',
      values: [id, username, password, fullname],
    };

    const result = await this._pool.query(query);

    return new RegisteredUser({...result.rows[0]});
  }
}

