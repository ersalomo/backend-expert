import {Container} from 'instances-container';
import {Request, ResponseToolkit} from '@hapi/hapi';
import LoginUserUseCase from '../../../../Applications/use_case/LoginUserUseCase';
import RefreshAuthenticationUseCase from '../../../../Applications/use_case/RefreshAuthenticationUseCase';
import LogoutUserUseCase from '../../../../Applications/use_case/LogoutUserUseCase';

export default class AuthenticationsHandler {
  constructor(private _container:Container) {
    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request:Request, h: ResponseToolkit) {
    const loginUserUseCase:LoginUserUseCase = this._container.getInstance(LoginUserUseCase.name);

    const {accessToken, refreshToken} = await loginUserUseCase.execute(request.payload);
    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request:Request, h:ResponseToolkit) {
    const refreshAuthenticationUseCase = this._container
        .getInstance(RefreshAuthenticationUseCase.name);
    const accessToken = await refreshAuthenticationUseCase.execute(request.payload);

    return h.response({
      status: 'success',
      data: {
        accessToken,
      },
    }).code(200);
  }

  async deleteAuthenticationHandler(request: Request, h:ResponseToolkit) {
    const logoutUserUseCase = this._container.getInstance(LogoutUserUseCase.name);
    await logoutUserUseCase.execute(request.payload);
    return h.response({
      status: 'success',
    });
  }
}

