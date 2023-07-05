import { TestBed } from '@angular/core/testing';
import { UtilsService } from 'services/utils.service';
import { utilsServiceStub } from 'services/utils.service.stub';
import { OrigineMRPipe } from './origine-mr.pipe';

describe(OrigineMRPipe.name, () => {
  let pipe: OrigineMRPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrigineMRPipe,
        { provide: UtilsService, useFactory: utilsServiceStub }
      ]
    });
    pipe = TestBed.inject(OrigineMRPipe);
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
