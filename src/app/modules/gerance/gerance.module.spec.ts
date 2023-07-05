import {GeranceModule} from './gerance.module';

describe(GeranceModule.name, () => {
  let geranceModule: GeranceModule;

  beforeEach(() => {
    geranceModule = new GeranceModule();

  });

  it('should create an instance', () => {
    expect(GeranceModule).toBeTruthy();
  });
});

