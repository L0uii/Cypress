import { User } from "models/user";
import { of } from "rxjs";

const selectedCodeBudget = '11111';
const codeBudgets = ['11111', '22222', '33333'];
const currentUser: User = {
  matricule: '11111',
  email: 'user@fiducial.net',
  firstName: 'First',
  lastName: 'Last',
  id: '1'
};

export const userServiceStub = () => ({
  selectedCodeBudget,
  selectedCodeBudgetRef: of(selectedCodeBudget),
  codeBudgets,
  currentUser,
  fetchUserData: () => ({}),
  editCodeBudgetPlus: user => ({}),
  setCodeBudget: selectedCodeBudget => ({})
});
