import { TestBed } from '@angular/core/testing';
import { ProduitsGeranceAssociesPipe } from './produit-gerance-associes.pipe';

describe(ProduitsGeranceAssociesPipe.name, () => {
  let pipe: ProduitsGeranceAssociesPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduitsGeranceAssociesPipe]
    });
    pipe = TestBed.inject(ProduitsGeranceAssociesPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  // it('transforms X to Y', () => {
  //   const value: any = 'X';
  //   expect(pipe.transform(value)).toEqual('Y');
  // });
});
