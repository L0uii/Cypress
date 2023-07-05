import { ReactiveFormsModule } from '@angular/forms';
import { utilsServiceStub } from 'services/utils.service.stub';
import { UtilsService } from 'services/utils.service';
import { FetchDataService } from 'services/fetch-data.service';
import { userServiceStub } from 'services/user.service.stub';
import { UserService } from './user.service';
import { TestBed } from '@angular/core/testing';

import { CodeBudgetService } from './code-budget.service';
import { fetchDataServiceStub } from './fetch-data.stub';

describe('CodeBudgetService', () => {
  let service: CodeBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      providers: [
        CodeBudgetService,
        { provide: UserService, useFactory: userServiceStub },
        { provide: FetchDataService, useFactory: fetchDataServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub }
      ]
    });
    service = TestBed.inject(CodeBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
