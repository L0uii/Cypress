import { GeranceImmobilierModule } from './gerance-immobilier.module';

describe(GeranceImmobilierModule.name, () => {
  let geranceImmobilierModule: GeranceImmobilierModule;

  beforeEach(() => {
    geranceImmobilierModule = new GeranceImmobilierModule();
  });

  it('should create an instance', () => {
    expect(geranceImmobilierModule).toBeTruthy();
  });
});
