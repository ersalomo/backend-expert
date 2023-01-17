import ClientError from '../exceptions/ClientError';

class AuthorizationError extends ClientError {
  constructor(public message:string) {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

module.exports = AuthorizationError;
