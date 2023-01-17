export default interface AuthenticationRepository {
  addToken(token:string):void
  checkAvailabilityToken(token:string):void
  deleteToken(token:string):void
};
// throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');


