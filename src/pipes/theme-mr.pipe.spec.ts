import { TestBed } from '@angular/core/testing';
import { ThemeMrPipe } from './theme-mr.pipe';

describe(ThemeMrPipe.name, () => {
  let pipe: ThemeMrPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ThemeMrPipe] });
    pipe = TestBed.inject(ThemeMrPipe);
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
