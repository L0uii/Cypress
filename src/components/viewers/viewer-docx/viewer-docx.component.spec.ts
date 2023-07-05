// import { RouterTestingModule } from '@angular/router/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { NodesApiService } from '@alfresco/adf-core';
// import { ContentService } from '@alfresco/adf-core';
// import { ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';
// import { UpdateResultsService } from 'services/update-results.service';
// import { ExpLevelPipe } from 'pipes/exp-level.pipe';
// import { ViewerDocxComponent } from './viewer-docx.component';

// describe(ViewerDocxComponent.name, () => {
//   let component: ViewerDocxComponent;
//   let fixture: ComponentFixture<ViewerDocxComponent>;

//   beforeEach(() => {
//     const nodesApiServiceStub = () => ({
//       getNode: id => ({ toPromise: () => ({ then: () => ({}) }) })
//     });
//     const contentServiceStub = () => ({ getContentUrl: nodeId => ({}) });
//     const activatedRouteStub = () => ({
//       params: { subscribe: f => f({}) },
//       queryParams: { subscribe: f => f({}) }
//     });
//     const routerStub = () => ({ navigate: array => ({}) });
//     const updateResultsServiceStub = () => ({
//       mustRefreshChange: { subscribe: f => f({}) }
//     });
//     TestBed.configureTestingModule({
//       schemas: [NO_ERRORS_SCHEMA],
//       imports: [RouterTestingModule],
//       declarations: [ViewerDocxComponent, ExpLevelMockPipe],
//       providers: [
//         { provide: NodesApiService, useFactory: nodesApiServiceStub },
//         { provide: ContentService, useFactory: contentServiceStub },
//         { provide: ActivatedRoute, useFactory: activatedRouteStub },
//         { provide: Router, useFactory: routerStub },
//         { provide: UpdateResultsService, useFactory: updateResultsServiceStub }
//       ]
//     });
//     spyOn(ViewerDocxComponent.prototype, 'loadProperties');
//     fixture = TestBed.createComponent(ViewerDocxComponent);
//     component = fixture.componentInstance;
//   });

//   it('can load instance', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('constructor', () => {
//     it('makes expected calls', () => {
//       expect(ViewerDocxComponent.prototype.loadProperties).toHaveBeenCalled();
//     });
//   });

//   describe('close', () => {
//     it('makes expected calls', () => {
//       const routerStub: Router = fixture.debugElement.injector.get(Router);
//       spyOn(routerStub, 'navigate').and.callThrough();
//       component.close();
//       expect(routerStub.navigate).toHaveBeenCalled();
//     });
//   });

//   describe('updateCV', () => {
//     it('makes expected calls', () => {
//       const routerStub: Router = fixture.debugElement.injector.get(Router);
//       spyOn(routerStub, 'navigate').and.callThrough();
//       component.updateCV();
//       expect(routerStub.navigate).toHaveBeenCalled();
//     });
//   });

//   describe('ngOnInit', () => {
//     it('makes expected calls', () => {
//       const contentServiceStub: ContentService = fixture.debugElement.injector.get(
//         ContentService
//       );
//       (<jasmine.Spy>component.loadProperties).calls.reset();
//       spyOn(component, 'convertDocxToHtml').and.callThrough();
//       spyOn(contentServiceStub, 'getContentUrl').and.callThrough();
//       component.ngOnInit();
//       expect(component.loadProperties).toHaveBeenCalled();
//       expect(component.convertDocxToHtml).toHaveBeenCalled();
//       expect(contentServiceStub.getContentUrl).toHaveBeenCalled();
//     });
//   });
// });


// import {Pipe, PipeTransform} from '@angular/core';

// @Pipe({name: 'expLevel'})
// class ExpLevelMockPipe implements PipeTransform {
//     transform(value: string): string {
//         return value;
//     }
// }
