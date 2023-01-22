import {Request, ResponseToolkit} from '@hapi/hapi'
import AddUserUseCase from '../../../../Applications/use_case/AddUserUseCase';
// import {Container} from 'instances-container';

export default class UserHandler {
  private _container:any;
  constructor(container:any) {
    this._container = container;
    this.postUserHandler = this.postUserHandler.bind(this)
  }
  async postUserHandler(request:Request, h: ResponseToolkit) {
    const addUserUseCase:AddUserUseCase = this._container.getInstance(AddUserUseCase.name);
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
