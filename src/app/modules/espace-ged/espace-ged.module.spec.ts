import { EspaceGedModule } from './espace-ged.module';

describe(EspaceGedModule.name, () => {
  let espaceGedModule: EspaceGedModule;

  beforeEach(() => {
    espaceGedModule = new EspaceGedModule();
  });

  it('should create an instance', () => {
    expect(espaceGedModule).toBeTruthy();
  });
});
