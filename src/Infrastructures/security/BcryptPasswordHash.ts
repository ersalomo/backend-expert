import PasswordHash from '../../Applications/security/PasswordHash';
import AuthenticationError from '../../commons/exceptions/AuthorizationError';

export default class BcryptPasswordHash extends PasswordHash {
  constructor(private _bcrypt:any, private _saltRound:number = 10) {
    super()
  }

  async hash(password:string) {
    return this._bcrypt.hash(password, this._saltRound);
  }
  async comparePassword(password:string, hashedPassword:string): Promise<void> {
    const result = await this._bcrypt.compare(password, hashedPassword);

    if (!result) {
      throw new AuthenticationError('kredensial yang Anda masukkan salah');
    }
  }
}

