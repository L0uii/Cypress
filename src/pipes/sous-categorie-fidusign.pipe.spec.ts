import { TestBed } from '@angular/core/testing';
import { SousCategorieFidusignPipe } from './sous-categorie-fidusign.pipe';

describe(SousCategorieFidusignPipe.name, () => {
  let pipe: SousCategorieFidusignPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SousCategorieFidusignPipe] });
    pipe = TestBed.inject(SousCategorieFidusignPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  // it('transforms X to Y', () => {
  //   const value: any = 'X';
  //   expect(pipe.transform(value)).toEqual('Y');
  // });
});
