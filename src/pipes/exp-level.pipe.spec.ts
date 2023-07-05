import { TestBed } from '@angular/core/testing';
import { ExpLevelPipe } from './exp-level.pipe';

describe(ExpLevelPipe.name, () => {
  let pipe: ExpLevelPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ExpLevelPipe] });
    pipe = TestBed.inject(ExpLevelPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it(`transforms value to '0 à 3 ans'`, () => {
    const ages = [...Array(4).keys()];
    ages.forEach(value => {
      expect(pipe.transform(value)).toEqual('0 à 3 ans');
    });
  });

  it(`transforms value to '3 à 7 ans'`, () => {
    const ages = [...Array(4).keys()].map(i => i + 4);
    ages.forEach(value => {
      expect(pipe.transform(value)).toEqual('3 à 7 ans');
    });
  });

  it(`transforms value to '+ 7 ans'`, () => {
    const ages = [...Array(3).keys()].map(i => i + 8);
    ages.forEach(value => {
      expect(pipe.transform(value)).toEqual('+ 7 ans');
    });
  });
});
