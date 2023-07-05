import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PeopleContentService } from '@alfresco/adf-core';
import { IntranetUser } from '../models/intranet-user';
import { UserService } from './user.service';
import { UtilsService } from './utils.service';
import { utilsServiceStub } from './utils.service.stub';

describe(UserService.name, () => {
  let service: UserService;

  beforeEach(() => {
    const peopleContentServiceStub = () => ({
      getPerson: arg => ({ toPromise: () => ({ then: () => ({}) }) })
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: PeopleContentService, useFactory: peopleContentServiceStub }
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('editCodeBudgetPlus', () => {
    it('makes expected calls', () => {
      const intranetUserStub: IntranetUser = <any>{};
      service.editCodeBudgetPlus(intranetUserStub);
    });
  });

  // describe('fetchUserData', () => {
  //   it('makes expected calls', () => {
  //     const authenticationServiceStub: AuthenticationService = TestBed.inject(
  //       AuthenticationService
  //     );
  //     const peopleContentServiceStub: PeopleContentService = TestBed.inject(
  //       PeopleContentService
  //     );
  //     spyOn(service, 'setCodeBudget').and.callThrough();
  //     spyOn(authenticationServiceStub, 'getEcmUsername').and.callThrough();
  //     spyOn(peopleContentServiceStub, 'getPerson').and.callThrough();
  //     service.fetchUserData();
  //     expect(service.setCodeBudget).toHaveBeenCalled();
  //     expect(authenticationServiceStub.getEcmUsername).toHaveBeenCalled();
  //     expect(peopleContentServiceStub.getPerson).toHaveBeenCalled();
  //   });
  // });
});
