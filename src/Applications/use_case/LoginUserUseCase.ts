import UserLogin from '../../Domains/users/entities/UserLogin';
import NewAuthentication from '../../Domains/authentications/entities/NewAuth';
import UserRepository from '../../Domains/users/UserRepository';
import PasswordHash from '../security/PasswordHash';
import AuthenticationTokenManager from '../security/AuthenticationTokenManager';
import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository';

export default class LoginUserUseCase {
  constructor(
      private _userRepository: UserRepository,
      private _authenticationRepository: AuthenticationRepository,
      private _authenticationTokenManager: AuthenticationTokenManager,
      private _passwordHash: PasswordHash,
  ) {}

  async execute(useCasePayload:any) {
    const {username, password} = new UserLogin(useCasePayload);
    const encryptedPassword = await this._userRepository.getPasswordByUsername(username);
    await this._passwordHash.comparePassword(password, encryptedPassword);
    const id = await this._userRepository.getIdByUsername(username);
    const accessToken = await this._authenticationTokenManager
        .createAccessToken({username, id});
    const refreshToken = await this._authenticationTokenManager
        .createRefreshToken({username, id});
    const newAuthentication = new NewAuthentication({accessToken, refreshToken});

    await this._authenticationRepository.addToken(newAuthentication.refreshToken);

    return newAuthentication;
  }
}

