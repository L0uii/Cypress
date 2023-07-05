import { ServicesModule } from './services.module';

describe(ServicesModule.name, () => {
  let servicesModule: ServicesModule;

  beforeEach(() => {
    servicesModule = new ServicesModule();
  });

  it('should create an instance', () => {
    expect(servicesModule).toBeTruthy();
  });
});
