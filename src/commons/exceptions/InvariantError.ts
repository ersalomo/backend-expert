import ClientError from './ClientError';

export default class InvariantError extends ClientError {
  constructor(public message:string, public statusCode:number = 404) {
    super(message);
    this.name = 'InvariantError';
  }
}
