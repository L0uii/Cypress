import { SharedComponentsModule } from './shared-components.module';

describe(SharedComponentsModule.name, () => {
  let sharedComponentsModule: SharedComponentsModule;

  beforeEach(() => {
    sharedComponentsModule = new SharedComponentsModule();
  });

  it('should create an instance', () => {
    expect(sharedComponentsModule).toBeTruthy();
  });
});
