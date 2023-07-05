import { TestBed } from '@angular/core/testing';
import { PendingSignatairePipe } from './pending-signataire.pipe';

describe(PendingSignatairePipe.name, () => {
  let pipe: PendingSignatairePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [PendingSignatairePipe] });
    pipe = TestBed.inject(PendingSignatairePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  // it('transforms X to Y', () => {
  //   const value: any = 'X';
  //   expect(pipe.transform(value)).toEqual('Y');
  // });
});
