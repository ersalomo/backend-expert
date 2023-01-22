import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository'
import AuthenticationTokenManager from '../security/AuthenticationTokenManager';

export default class RefreshAuthenticationUseCase {
  constructor(
      private _authenticationRepository: AuthenticationRepository,
      private _authenticationTokenManager:AuthenticationTokenManager,
  ) {}

  async execute(useCasePayload:{refreshToken:string}) {
    this._verifyPayload(useCasePayload);
    const {refreshToken} = useCasePayload;

    await this._authenticationTokenManager.verifyRefreshToken(refreshToken);
    await this._authenticationRepository.checkAvailabilityToken(refreshToken);

    const {username, id} = await this._authenticationTokenManager.decodePayload(refreshToken);

    return this._authenticationTokenManager.createAccessToken({username, id});
  }

  _verifyPayload(payload:any) {
    const {refreshToken} = payload;

    if (!refreshToken) {
      throw new Error('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

