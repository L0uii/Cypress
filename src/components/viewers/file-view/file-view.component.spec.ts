import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { NodesApiService } from '@alfresco/adf-core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { FileViewComponent } from './file-view.component';

describe(FileViewComponent.name, () => {
  let component: FileViewComponent;
  let fixture: ComponentFixture<FileViewComponent>;

  beforeEach(() => {
    const locationStub = () => ({ back: () => ({}) });
    const nodesApiServiceStub = () => ({
      getNode: id => ({ toPromise: () => ({ then: () => ({}) }) })
    });
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    const routerStub = () => ({ navigate: array => ({}) });
    const matSnackBarStub = () => ({});
    const titleStub = () => ({ setTitle: displayName => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FileViewComponent],
      providers: [
        { provide: Location, useFactory: locationStub },
        { provide: NodesApiService, useFactory: nodesApiServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: MatSnackBar, useFactory: matSnackBarStub },
        { provide: Title, useFactory: titleStub }
      ]
    });
    fixture = TestBed.createComponent(FileViewComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const nodesApiServiceStub: NodesApiService = fixture.debugElement.injector.get(
  //       NodesApiService
  //     );
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     const titleStub: Title = fixture.debugElement.injector.get(Title);
  //     spyOn(nodesApiServiceStub, 'getNode').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     spyOn(titleStub, 'setTitle').and.callThrough();
  //     component.ngOnInit();
  //     expect(nodesApiServiceStub.getNode).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //     expect(titleStub.setTitle).toHaveBeenCalled();
  //   });
  // });
});
