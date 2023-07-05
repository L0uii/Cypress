import { FidusignModule } from './fidusign.module';

describe(FidusignModule.name, () => {
  let fidusignModule: FidusignModule;

  beforeEach(() => {
    fidusignModule = new FidusignModule();
  });

  it('should create an instance', () => {
    expect(fidusignModule).toBeTruthy();
  });
});
