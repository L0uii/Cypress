import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '@alfresco/adf-core';
import { NodesApiService } from '@alfresco/adf-core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UtilsService } from './utils.service';
import { ArchivesPresidenceService } from './archives-presidence.service';
import { utilsServiceStub } from './utils.service.stub';

describe(ArchivesPresidenceService.name, () => {
  let service: ArchivesPresidenceService;

  beforeEach(() => {
    const authenticationServiceStub = () => ({ getEcmUsername: () => ({}) });
    const nodesApiServiceStub = () => ({
      getNode: nodeId => ({ toPromise: () => ({ then: () => ({}) }) })
    });
    TestBed.configureTestingModule({
      providers: [
        ArchivesPresidenceService,
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: NodesApiService, useFactory: nodesApiServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub }
      ]
    });
    service = TestBed.inject(ArchivesPresidenceService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  // describe('required', () => {
  //   it('makes expected calls', () => {
  //     const formControlStub: FormControl = <any>{};
  //     spyOn(formControlStub, 'setValidators').and.callThrough();
  //     spyOn(formControlStub, 'updateValueAndValidity').and.callThrough();
  //     service.required(formControlStub);
  //     expect(formControlStub.setValidators).toHaveBeenCalled();
  //     expect(formControlStub.updateValueAndValidity).toHaveBeenCalled();
  //   });
  // });

  // describe('notRequired', () => {
  //   it('makes expected calls', () => {
  //     const formControlStub: FormControl = <any>{};
  //     spyOn(formControlStub, 'setValidators').and.callThrough();
  //     spyOn(formControlStub, 'updateValueAndValidity').and.callThrough();
  //     service.notRequired(formControlStub);
  //     expect(formControlStub.setValidators).toHaveBeenCalled();
  //     expect(formControlStub.updateValueAndValidity).toHaveBeenCalled();
  //   });
  // });
});
