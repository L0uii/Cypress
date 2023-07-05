import { TestBed } from '@angular/core/testing';
import { VisibilityClientMrPipe } from './visibility-client-mr.pipe';

describe(VisibilityClientMrPipe.name, () => {
  let pipe: VisibilityClientMrPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [VisibilityClientMrPipe] });
    pipe = TestBed.inject(VisibilityClientMrPipe);
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
