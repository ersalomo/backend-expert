
class DetailThreadUseCase {
  constructor({threadRepository}) {
    this._threadRepository = threadRepository;
  }
  async execute(useCasePayload) {
    return await this._threadRepository.getThreads(useCasePayload);
  }
}

module.exports = DetailThreadUseCase;
