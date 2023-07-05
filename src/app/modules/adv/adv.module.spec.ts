import { AdvModule } from './adv.module';

describe(AdvModule.name, () => {
  let advModule: AdvModule;

  beforeEach(() => {
    advModule = new AdvModule();
  });

  it('should create an instance', () => {
    expect(advModule).toBeTruthy();
  });
});
