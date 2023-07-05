import { ConseilModule } from './conseil.module';

describe(ConseilModule.name, () => {
  let conseilModule: ConseilModule;

  beforeEach(() => {
    conseilModule = new ConseilModule();
  });

  it('should create an instance', () => {
    expect(conseilModule).toBeTruthy();
  });
});
