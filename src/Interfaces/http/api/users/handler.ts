import {Request, Res} from '@hapi/hapi'
import AddUserUseCase from '../../../../Applications/use_case/AddUserUseCase';

export default class UserHandler {
  private container:Container;

  constructor(container:Container) {
    this.container = container;
  }

  async postUserHandler(request:Request, h) {
    const addUserUseCase = this.container.getInstance(AddUserUseCase.name);
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
