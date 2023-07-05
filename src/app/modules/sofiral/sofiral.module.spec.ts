import { SofiralModule } from './sofiral.module';

describe(SofiralModule.name, () => {
  let sofiralModule: SofiralModule;

  beforeEach(() => {
    sofiralModule = new SofiralModule();
  });

  it('should create an instance', () => {
    expect(sofiralModule).toBeTruthy();
  });
});
