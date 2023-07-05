import { TestBed } from '@angular/core/testing';
import { ProrietaireGerancePipe } from './prorietaire-gerance.pipe';

describe(ProrietaireGerancePipe.name, () => {
  let pipe: ProrietaireGerancePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ProrietaireGerancePipe] });
    pipe = TestBed.inject(ProrietaireGerancePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  // it('transforms X to Y', () => {
  //   const value: any = 'X';
  //   expect(pipe.transform(value)).toEqual('Y');
  // });
});
