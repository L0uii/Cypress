import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateResultsService } from 'services/update-results.service';
import { DeleteDocumentService } from './delete-document.service';
import { DeleteDocumentComponent } from './delete-document.component';

describe(DeleteDocumentComponent.name, () => {
  let component: DeleteDocumentComponent;
  let fixture: ComponentFixture<DeleteDocumentComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const updateResultsServiceStub = () => ({
      triggerRefreshChange: arg => ({})
    });
    const deleteDocumentServiceStub = () => ({
      documentsToBeDeleted: { map: () => ({ join: () => ({}) }) },
      removeDocuments: documentsId => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DeleteDocumentComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: UpdateResultsService, useFactory: updateResultsServiceStub },
        {
          provide: DeleteDocumentService,
          useFactory: deleteDocumentServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(DeleteDocumentComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('close', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.close();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  // describe('deleteDocument', () => {
  //   it('makes expected calls', () => {
  //     const deleteDocumentServiceStub: DeleteDocumentService = fixture.debugElement.injector.get(
  //       DeleteDocumentService
  //     );
  //     spyOn(deleteDocumentServiceStub, 'removeDocuments').and.callThrough();
  //     component.deleteDocument();
  //     expect(deleteDocumentServiceStub.removeDocuments).toHaveBeenCalled();
  //   });
  // });
});
