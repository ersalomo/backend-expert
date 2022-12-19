
export default class ClientError extends Error {
  statusCode?: number = 400;
  constructor(public message:string, statusCode?:number) {
    super(message);
    if (this.constructor.name === 'ClientError') {
      throw new Error('cannot instantiate abstract class');
    }

    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

