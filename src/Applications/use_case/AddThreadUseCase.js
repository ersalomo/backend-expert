const AddThread = require('../../Domains/threads/entities/AddThread');

class AddThreadUseCase {
  constructor({threadRepository}) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const addThread = new AddThread(useCasePayload);
    console.log('payload usecase', addThread);
    await this._threadRepository.veryfyUserId(addThread.userId);
    return this._threadRepository.addThread(addThread);
  }
}
module.exports = AddThreadUseCase;
