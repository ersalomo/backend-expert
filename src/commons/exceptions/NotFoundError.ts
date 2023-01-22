import ClientError from './ClientError';

export default class NotFoundError extends ClientError {
  constructor(public message: string, public statusCode:number = 404) {
    super(message);
    this.name = 'NotFoundError';
  }
}
