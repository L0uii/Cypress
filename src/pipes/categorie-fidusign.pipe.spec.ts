import { TestBed } from '@angular/core/testing';
import { CategorieFidusignPipe } from './categorie-fidusign.pipe';

describe(CategorieFidusignPipe.name, () => {
  let pipe: CategorieFidusignPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CategorieFidusignPipe] });
    pipe = TestBed.inject(CategorieFidusignPipe);
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
