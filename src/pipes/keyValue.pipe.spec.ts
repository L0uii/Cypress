import { TestBed } from '@angular/core/testing';
import { KeyValuePipe } from './keyValue.pipe';

describe(KeyValuePipe.name, () => {
  let pipe: KeyValuePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [KeyValuePipe] });
    pipe = TestBed.inject(KeyValuePipe);
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
