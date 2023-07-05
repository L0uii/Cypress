import { LoginModule } from './login.module';

describe(LoginModule.name, () => {
  let achatsModule: LoginModule;

  beforeEach(() => {
    achatsModule = new LoginModule();
  });

  it('should create an instance', () => {
    expect(achatsModule).toBeTruthy();
  });
});
