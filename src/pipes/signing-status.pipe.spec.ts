import { TestBed } from '@angular/core/testing';
import { SigningStatusPipe } from './signing-status.pipe';

describe(SigningStatusPipe.name, () => {
  let pipe: SigningStatusPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SigningStatusPipe] });
    pipe = TestBed.inject(SigningStatusPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  // it('transforms X to Y', () => {
  //   const value: any = 'X';
  //   expect(pipe.transform(value)).toEqual('Y');
  // });
});
