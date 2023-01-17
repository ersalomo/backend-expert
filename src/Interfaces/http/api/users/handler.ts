import {Request, ResponseToolkit} from '@hapi/hapi'
import AddUserUseCase from '../../../../Applications/use_case/AddUserUseCase';
import {Container} from 'instances-container';

export default class UserHandler {
  constructor(private _container:Container) {}

  async postUserHandler(request:Request, h: ResponseToolkit) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }
}
