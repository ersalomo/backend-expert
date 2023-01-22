import ThreadRepository from '../../Domains/threads/ThreadRepository';
import AddThread from '../../Domains/threads/entities/AddThread';

export default class AddThreadUseCase {
  constructor(private _threadRepository:ThreadRepository) {
  }

  async execute(useCasePayload: any, owner:string) {
    useCasePayload.owner = owner
    const addThread = new AddThread(useCasePayload);
    return this._threadRepository.addThread(addThread);
  }
}
