import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NodesApiService } from '@alfresco/adf-core';
import { ContentService } from '@alfresco/adf-core';
import { SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { ViewerMultiPdfComponent } from './viewer-multi-pdf.component';

describe(ViewerMultiPdfComponent.name, () => {
  let component: ViewerMultiPdfComponent;
  let fixture: ComponentFixture<ViewerMultiPdfComponent>;

  beforeEach(() => {
    const nodesApiServiceStub = () => ({
      getNode: id => ({ toPromise: () => ({ then: () => ({}) }) })
    });
    const contentServiceStub = () => ({ getContentUrl: id => ({}) });
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    const routerStub = () => ({
      url: { includes: () => ({}) },
      navigate: array => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ViewerMultiPdfComponent],
      providers: [
        { provide: NodesApiService, useFactory: nodesApiServiceStub },
        { provide: ContentService, useFactory: contentServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(ViewerMultiPdfComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('ngOnChanges', () => {
  //   it('makes expected calls', () => {
  //     const simpleChangesStub: SimpleChanges = <any>{};
  //     spyOn(component, 'setPage').and.callThrough();
  //     component.ngOnChanges(simpleChangesStub);
  //     expect(component.setPage).toHaveBeenCalled();
  //   });
  // });

  describe('close', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.close();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const contentServiceStub: ContentService = fixture.debugElement.injector.get(
  //       ContentService
  //     );
  //     spyOn(component, 'setPage').and.callThrough();
  //     spyOn(contentServiceStub, 'getContentUrl').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.setPage).toHaveBeenCalled();
  //     expect(contentServiceStub.getContentUrl).toHaveBeenCalled();
  //   });
  // });
});
