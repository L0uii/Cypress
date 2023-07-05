import { TestBed } from '@angular/core/testing';
import { UtilsService } from 'services/utils.service';
import { utilsServiceStub } from 'services/utils.service.stub';
import { CreatorPipe } from './creator.pipe';

describe(CreatorPipe.name, () => {
  let pipe: CreatorPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreatorPipe,
        { provide: UtilsService, useFactory: utilsServiceStub }
      ]
    });
    pipe = TestBed.inject(CreatorPipe);
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
