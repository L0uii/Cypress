import { TestBed } from '@angular/core/testing';
import { SousCategorieMrPipe } from './sous-categorie-mr.pipe';

describe(SousCategorieMrPipe.name, () => {
  let pipe: SousCategorieMrPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SousCategorieMrPipe] });
    pipe = TestBed.inject(SousCategorieMrPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  // it('transforms X to Y', () => {
  //   const value: any = 'X';
  //   expect(pipe.transform(value)).toEqual('Y');
  // });
});
