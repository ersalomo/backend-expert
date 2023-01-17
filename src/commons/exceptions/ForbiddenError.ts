import ClientError from './ClientError';

export default class ForbiddenError extends ClientError {
  constructor(public message:string, public statusCode:number = 403) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

