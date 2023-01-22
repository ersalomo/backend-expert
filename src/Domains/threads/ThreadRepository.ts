export default abstract class ThreadRepository {
  abstract checkExistsThreadById(idThread:string):Promise<any>
  abstract addThread(registerthread:any):Promise<any>
  abstract getDetailThreadById(idThread:any):Promise<any>
};
