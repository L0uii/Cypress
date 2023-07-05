import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NodesApiService } from '@alfresco/adf-core';
import { ContentService } from '@alfresco/adf-core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { ExpLevelPipe } from 'pipes/exp-level.pipe';
import { ViewerPdfComponent } from './viewer-pdf.component';

describe(ViewerPdfComponent.name, () => {
  let component: ViewerPdfComponent;
  let fixture: ComponentFixture<ViewerPdfComponent>;

  beforeEach(() => {
    const nodesApiServiceStub = () => ({
      getNode: id => ({ toPromise: () => ({ then: () => ({}) }) })
    });
    const contentServiceStub = () => ({ getContentUrl: nodeId => ({}) });
    const activatedRouteStub = () => ({
      params: { subscribe: f => f({}) },
      queryParams: { subscribe: f => f({}) }
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const expLevelPipeStub = () => ({ transform: arg => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ViewerPdfComponent],
      providers: [
        { provide: NodesApiService, useFactory: nodesApiServiceStub },
        { provide: ContentService, useFactory: contentServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: ExpLevelPipe, useFactory: expLevelPipeStub }
      ]
    });
    fixture = TestBed.createComponent(ViewerPdfComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('updateCV', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.updateCV();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.close();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const contentServiceStub: ContentService = fixture.debugElement.injector.get(
        ContentService
      );
      spyOn(component, 'loadProperties').and.callThrough();
      spyOn(contentServiceStub, 'getContentUrl').and.callThrough();
      component.ngOnInit();
      expect(component.loadProperties).toHaveBeenCalled();
      expect(contentServiceStub.getContentUrl).toHaveBeenCalled();
    });
  });
});
