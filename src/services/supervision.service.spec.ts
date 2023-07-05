import { TestBed } from '@angular/core/testing';
import { AlfrescoApiService } from '@alfresco/adf-core';
import { SupervisionService } from './supervision.service';

describe(SupervisionService.name, () => {
  let service: SupervisionService;

  beforeEach(() => {
    const alfrescoApiServiceStub = () => ({
      getInstance: () => ({
        login: () => ({ then: () => ({ catch: () => ({}) }) })
      })
    });
    TestBed.configureTestingModule({
      providers: [
        SupervisionService,
        { provide: AlfrescoApiService, useFactory: alfrescoApiServiceStub }
      ]
    });
    service = TestBed.inject(SupervisionService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('testGFA', () => {
    it('makes expected calls', () => {
      const alfrescoApiServiceStub: AlfrescoApiService = TestBed.inject(
        AlfrescoApiService
      );
      spyOn(alfrescoApiServiceStub, 'getInstance').and.callThrough();
      service.testGFA();
      expect(alfrescoApiServiceStub.getInstance).toHaveBeenCalled();
    });
  });

  describe('testAll', () => {
    it('makes expected calls', () => {
      const alfrescoApiServiceStub: AlfrescoApiService = TestBed.inject(
        AlfrescoApiService
      );
      spyOn(alfrescoApiServiceStub, 'getInstance').and.callThrough();
      service.testAll();
      expect(alfrescoApiServiceStub.getInstance).toHaveBeenCalled();
    });
  });
});
