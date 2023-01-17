import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository';

class DeleteAuthenticationUseCase {
  constructor(
    private _authenticationRepository: AuthenticationRepository,
  ) {}

  async execute(useCasePayload:{refreshToken:string}) {
    this._validatePayload(useCasePayload);
    const {refreshToken} = useCasePayload;
    await this._authenticationRepository.checkAvailabilityToken(refreshToken);
    await this._authenticationRepository.deleteToken(refreshToken);
  }

  _validatePayload(payload:{refreshToken:string}) {
    const {refreshToken} = payload;
    if (!refreshToken) {
      throw new Error('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DeleteAuthenticationUseCase;
