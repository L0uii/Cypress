import {BudgetplusGestionModule} from './budgetplus-gestion.module';

describe(BudgetplusGestionModule.name, () => {
  let addCodeBudgetModule: BudgetplusGestionModule;

  beforeEach(() => {
    addCodeBudgetModule = new BudgetplusGestionModule();
  });

  it('should create an instance', () => {
    expect(addCodeBudgetModule).toBeTruthy();
  });
});
