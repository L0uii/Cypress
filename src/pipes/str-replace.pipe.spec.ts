import { TestBed } from '@angular/core/testing';
import { StrReplacePipe } from './str-replace.pipe';

describe(StrReplacePipe.name, () => {
  let pipe: StrReplacePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [StrReplacePipe] });
    pipe = TestBed.inject(StrReplacePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  // it('transforms X to Y', () => {
  //   const value: any = 'X';
  //   const valueA: any = 'A';
  //   const valueB: any = 'B';
  //   expect(pipe.transform(value, valueA, valueB)).toEqual('Y');
  // });
});
