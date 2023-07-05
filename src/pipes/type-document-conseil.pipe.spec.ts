import { TestBed } from '@angular/core/testing';
import { TypeDocumentConseilPipe } from './type-document-conseil.pipe';

describe(TypeDocumentConseilPipe.name, () => {
  let pipe: TypeDocumentConseilPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TypeDocumentConseilPipe] });
    pipe = TestBed.inject(TypeDocumentConseilPipe);
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
