import { TestBed } from '@angular/core/testing';
import { CategorieConseilPipe } from './categorie-conseil.pipe';

describe(CategorieConseilPipe.name, () => {
  let pipe: CategorieConseilPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CategorieConseilPipe] });
    pipe = TestBed.inject(CategorieConseilPipe);
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
