import { TestBed } from '@angular/core/testing';
import { OngletMrPipe } from './onglet-mr.pipe';

describe(OngletMrPipe.name, () => {
  let pipe: OngletMrPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [OngletMrPipe] });
    pipe = TestBed.inject(OngletMrPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it(`transforms 'Généralités' to 'Généralités (non visible client)'`, () => {
    const value = 'Généralités';
    expect(pipe.transform(value)).toEqual('Généralités (non visible client)');
  });

  it(`transforms 'Fiducial' to 'Fiducial (non visible client)'`, () => {
    const value = 'Fiducial';
    expect(pipe.transform(value)).toEqual('Fiducial (non visible client)');
  });

  it(`don't change name for 'Other' tab`, () => {
    const value = 'Other';
    expect(pipe.transform(value)).toEqual('Other');
  });
});
