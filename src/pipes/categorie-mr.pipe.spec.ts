import { TestBed } from '@angular/core/testing';
import { CategorieMrPipe } from './categorie-mr.pipe';

describe(CategorieMrPipe.name, () => {
  let pipe: CategorieMrPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CategorieMrPipe] });
    pipe = TestBed.inject(CategorieMrPipe);
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
