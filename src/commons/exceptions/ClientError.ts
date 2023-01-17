export default class ClientError extends Error {
  constructor(public message:string, public statusCode:number = 400) {
    super(message);
    if (this.constructor.name === 'ClientError') {
      throw new Error('cannot instantiate abstract class');
    }

    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

