
export default interface AuthenticationTokenManager {
  createRefreshToken(payload):Promise<void>
  createAccessToken(payload):Promise<void>
  verifyRefreshToken(token:string):Promise<void>
  decodePayload():Promise<void>
    // throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
}

