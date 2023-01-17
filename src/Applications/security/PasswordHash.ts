export default interface PasswordHash {
  hash(password:string):any
  comparePassword(password:string, hashedPassword:string):any
}
