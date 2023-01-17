import ThreadRepository from '../../Domains/threads/ThreadRepository';
import AddThread from '../../Domains/threads/entities/AddThread';

export default class AddThreadUseCase {
  constructor(private _threadRepository:ThreadRepository) {
  }

  async execute(useCasePayload: AddThread) {
    const addThread = new AddThread(useCasePayload);
    return this._threadRepository.addThread(addThread);
  }
}
