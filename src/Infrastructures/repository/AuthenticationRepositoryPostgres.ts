import InvariantError from '../../Commons/exceptions/InvariantError';
import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository';
import {Pool} from 'pg';

class AuthenticationRepositoryPostgres implements AuthenticationRepository {
  constructor(private _pool:Pool) {}

  async addToken(token:string) {
    const query = {
      text: 'INSERT INTO authentications VALUES ($1)',
      values: [token],
    };

    await this._pool.query(query);
  }

  async checkAvailabilityToken(token:string) {
    const query = {
      text: 'SELECT * FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new InvariantError('refresh token tidak ditemukan di database');
    }
  }

  async deleteToken(token:string) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    };

    await this._pool.query(query);
  }
}

module.exports = AuthenticationRepositoryPostgres;
