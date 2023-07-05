import { TestBed } from '@angular/core/testing';
import { ConseilService } from 'services/conseil.service';
import { conseilServiceStub } from 'services/conseil.stub';
import { CodeBudgetPipe } from './code-budget.pipe';

describe(CodeBudgetPipe.name, () => {
  let pipe: CodeBudgetPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CodeBudgetPipe,
        { provide: ConseilService, useFactory: conseilServiceStub }
      ]
    });
    pipe = TestBed.inject(CodeBudgetPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  // it('transforms X to Y', () => {
  //   const value: any = 'X';
  //   const args: string[] = [];
  //   expect(pipe.transform(value)).toEqual('Y');
  // });
});
