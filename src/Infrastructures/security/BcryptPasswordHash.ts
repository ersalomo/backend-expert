import PasswordHash from '../../Applications/security/PasswordHash';
import AuthenticationError from '../../Commons/exceptions/AuthenticationError';

export default class BcryptPasswordHash implements PasswordHash {
  constructor(private _bcrypt:{}, private _saltRound:number = 10) {}

  async hash(password:string) {
    return this._bcrypt.hash(password, this._saltRound);
  }
  async comparePassword(password, hashedPassword):Promise<boolean> {
    const result = await this._bcrypt.compare(password, hashedPassword);

    if (!result) {
      throw new AuthenticationError('kredensial yang Anda masukkan salah');
    }
  }
}

