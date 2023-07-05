import { TestBed } from '@angular/core/testing';
import { CategorieGeranceAssociesPipe } from './categorie-gerance-associes.pipe';

describe(CategorieGeranceAssociesPipe.name, () => {
  let pipe: CategorieGeranceAssociesPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategorieGeranceAssociesPipe]
    });
    pipe = TestBed.inject(CategorieGeranceAssociesPipe);
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
