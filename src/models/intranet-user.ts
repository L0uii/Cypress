import { SearchEntries } from 'models/search';
import { SearchResult } from './search';
export interface IntranetUser extends SearchEntries {
  CodeBudgetPlus: string;
  Department: string;
  DepartmentNumber: string;
  Email: string;
  EmployeeNumber: string;
  FirstName: string;
  LastName: string;
  Organization: string;
  OrganizationId: string;
  Owner: {
    displayName: string;
    id: string;
  };
  UserName: string;
}

export interface IntranetUserResponse extends SearchResult {
  entries: IntranetUser[];
}
