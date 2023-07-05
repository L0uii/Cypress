import { TestBed } from '@angular/core/testing';
import { FamilleGeranceAssociesPipe } from './famille-gerance-associes.pipe';

describe(FamilleGeranceAssociesPipe.name, () => {
  let pipe: FamilleGeranceAssociesPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FamilleGeranceAssociesPipe] });
    pipe = TestBed.inject(FamilleGeranceAssociesPipe);
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
