export default interface ThreadRepository {
  checkExistsThreadById(idThread:string):Promise<void>
  addThread(registerthread:typeof AddThread):Promise<typeof AddedThread>
  getDetailThreadById(idThread:string):Promise<typeof ThreadDetail>
    // throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
};
