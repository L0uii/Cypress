import { ArchivePresidenceModule } from './archive-presidence.module';

describe(ArchivePresidenceModule.name, () => {
  let archivePresidenceModule: ArchivePresidenceModule;

  beforeEach(() => {
    archivePresidenceModule = new ArchivePresidenceModule();
  });

  it('should create an instance', () => {
    expect(archivePresidenceModule).toBeTruthy();
  });
});
