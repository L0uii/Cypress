import { TestBed } from '@angular/core/testing';
import { GeranceAssociesService } from 'services/gerance-associes.service';
import { GroupService } from 'services/group.service';
import { UserService } from 'services/user.service';
import { ContextService } from './context.service';
import { geranceAssociesServiceStub } from './gerance-associes.stub';
import { groupServiceStub } from './group.service.stub';

describe(ContextService.name, () => {
  let service: ContextService;

  beforeEach(() => {
    const userServiceStub = () => ({ clearContext: () => ({}) });
    TestBed.configureTestingModule({
      providers: [
        ContextService,
        {
          provide: GeranceAssociesService,
          useFactory: geranceAssociesServiceStub
        },
        { provide: GroupService, useFactory: groupServiceStub },
        { provide: UserService, useFactory: userServiceStub }
      ]
    });
    service = TestBed.inject(ContextService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('clear', () => {
    it('makes expected calls', () => {
      const geranceAssociesServiceStub: GeranceAssociesService = TestBed.inject(
        GeranceAssociesService
      );
      const groupServiceStub: GroupService = TestBed.inject(GroupService);
      const userServiceStub: UserService = TestBed.inject(UserService);
      spyOn(geranceAssociesServiceStub, 'clearContext').and.callThrough();
      spyOn(groupServiceStub, 'clearContext').and.callThrough();
      spyOn(userServiceStub, 'clearContext').and.callThrough();
      service.clear();
      expect(geranceAssociesServiceStub.clearContext).toHaveBeenCalled();
      expect(groupServiceStub.clearContext).toHaveBeenCalled();
      expect(userServiceStub.clearContext).toHaveBeenCalled();
    });
  });
});
