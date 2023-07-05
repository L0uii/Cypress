import { TestBed } from '@angular/core/testing';
import { CallbackPipe } from './callback.pipe';

describe(CallbackPipe.name, () => {
  let pipe: CallbackPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CallbackPipe] });
    pipe = TestBed.inject(CallbackPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  // it('transforms X to Y', () => {
  //   const value: any = 'X';
  //   const args: string[] = [];
  //   const callback = () => true;
  //   expect(pipe.transform(value, callback)).toEqual('Y');
  // });


});
