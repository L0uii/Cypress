import { ExpertiseConsultingModule } from './expertise-consulting.module';

describe(ExpertiseConsultingModule.name, () => {
  let expertiseConsultingModule: ExpertiseConsultingModule;

  beforeEach(() => {
    expertiseConsultingModule = new ExpertiseConsultingModule();
  });

  it('should create an instance', () => {
    expect(expertiseConsultingModule).toBeTruthy();
  });
});
