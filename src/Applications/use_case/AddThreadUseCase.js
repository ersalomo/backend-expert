const AddThread = require('../../Domains/threads/entities/AddThread');

class AddThreadUseCase {
  #threadRepository;

  constructor({threadRepository}) {
    this.#threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    console.log('payload usecase', addThread);
    const addThread = new AddThread(useCasePayload);
    await this.#threadRepository.veryfyUserId(addThread.userId);
    return this.#threadRepository.addUser(addThread);
  }
}


module.exports = AddThreadUseCase;
