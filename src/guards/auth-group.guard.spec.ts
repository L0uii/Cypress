import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { GroupService } from 'services/group.service';
import { groupServiceStub } from 'services/group.service.stub';
import { AuthGroupGuard } from './auth-group.guard';

describe(AuthGroupGuard.name, () => {
  let service: AuthGroupGuard;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      providers: [
        AuthGroupGuard,
        { provide: Router, useFactory: routerStub },
        { provide: GroupService, useFactory: groupServiceStub }
      ]
    });
    service = TestBed.inject(AuthGroupGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
