import {Request, ResponseToolkit} from '@hapi/hapi'
import AddUserUseCase from '../../../../Applications/use_case/AddUserUseCase';

export default class UserHandler {
  private container:any;

  constructor(container:any) {
    this.container = container;
  }

  async postUserHandler(request:Request, h: ResponseToolkit) {
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
