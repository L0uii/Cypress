import { RhExportModule } from './rh-export.module';

describe(RhExportModule.name, () => {
  let rhExportModule: RhExportModule;

  beforeEach(() => {
    rhExportModule = new RhExportModule();
  });

  it('should create an instance', () => {
    expect(RhExportModule).toBeTruthy();
  });
});

