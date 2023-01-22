
import AuthenticationTokenManager from '../../Applications/security/AuthenticationTokenManager';
import InvariantError from '../../Commons/exceptions/InvariantError';

export default class JwtTokenManager extends AuthenticationTokenManager {
  private _jwt :any
  constructor(jwt:any) {
    super();
    this._jwt = jwt;
  }

  async createAccessToken(payload:any) {
    return this._jwt.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }

  async createRefreshToken(payload:any) {
    return this._jwt.generate(payload, process.env.REFRESH_TOKEN_KEY);
  }

  async verifyRefreshToken(token:string) {
    try {
      const artifacts = this._jwt.decode(token);
      this._jwt.verify(artifacts, process.env.REFRESH_TOKEN_KEY);
    } catch (error) {
      throw new InvariantError('refresh token tidak valid');
    }
  }

  async decodePayload(token: string) {
    const artifacts = this._jwt.decode(token);
    return artifacts.decoded.payload;
  }
}
