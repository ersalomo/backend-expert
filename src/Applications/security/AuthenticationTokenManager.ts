export default abstract class AuthenticationTokenManager {
  abstract createRefreshToken(payload:{}):Promise<string>
  abstract createAccessToken(payload:{}):Promise<string>
  abstract verifyRefreshToken(token:string):Promise<void>
  abstract decodePayload(refreshToken:string):Promise<{id: string, username:string, password:string}>
}

