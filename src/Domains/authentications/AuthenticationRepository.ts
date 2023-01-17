export default interface AuthenticationRepository {
  addToken(token:string):void
  checkAvailabilityToken(token:string):Promise<void>
  deleteToken(token:string):Promise<void>
};
// throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');


