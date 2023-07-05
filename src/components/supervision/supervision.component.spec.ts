import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SupervisionService } from 'services/supervision.service';
import { SupervisionComponent } from './supervision.component';
import { environment } from 'environments/environment';

describe(SupervisionComponent.name, () => {
  let component: SupervisionComponent;
  let fixture: ComponentFixture<SupervisionComponent>;

  beforeEach(() => {
    const supervisionServiceStub = () => ({
      testGFA: () => ({ then: () => ({}) }),
      testFiduShare: () => ({ then: () => ({}) }),
      testAll: () => ({ then: () => ({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SupervisionComponent],
      providers: [
        { provide: SupervisionService, useFactory: supervisionServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SupervisionComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const supervisionServiceStub: SupervisionService = fixture.debugElement.injector.get(
        SupervisionService
      );
      spyOn(supervisionServiceStub, 'testGFA').and.callThrough();
      spyOn(supervisionServiceStub, 'testFiduShare').and.callThrough();
      spyOn(supervisionServiceStub, 'testAll').and.callThrough();
      component.ngOnInit();
      expect(supervisionServiceStub.testGFA).toHaveBeenCalled();
      expect(supervisionServiceStub.testFiduShare).toHaveBeenCalled();
      expect(supervisionServiceStub.testAll).toHaveBeenCalled();
    });
  });
});
