import { MaterialModule } from './../../../app/modules/shared/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDatepicker } from '@angular/material/datepicker';
import { LabelValue } from 'models/archives-presidence';
import { ArchivesPresidenceService } from 'services/archives-presidence.service';
import { UpdateResultsService } from 'services/update-results.service';
import { UtilsService } from 'services/utils.service';
import { FormsModule } from '@angular/forms';
import { HomeArchivesPresidenceComponent } from './home-archives-presidence.component';
import { SPACE } from '@angular/cdk/keycodes';
import { utilsServiceStub } from 'services/utils.service.stub';

describe(HomeArchivesPresidenceComponent.name, () => {
  let component: HomeArchivesPresidenceComponent;
  let fixture: ComponentFixture<HomeArchivesPresidenceComponent>;

  const sortBy: LabelValue[] = [
    {
      label: 'Date de création',
      value: 'created'
    },
    {
      label: 'Thématique',
      value: 'fiducial:domainContainerFamille'
    },
    {
      label: 'Localisation',
      value: 'fiducial:domainContainerApplication'
    }
  ];
  const order: LabelValue[] = [
    {
      label: 'Décroissant',
      value: false
    },
    {
      label: 'Croissant',
      value: true
    }
  ];

  beforeEach(() => {
    const archivesPresidenceServiceStub = () => ({
      sortBy,
      order,
    });
    const updateResultsServiceStub = () => ({
      triggerRefreshChange: arg => ({})
    });
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeArchivesPresidenceComponent, KeyValueMockPipe],
      providers: [
        {
          provide: ArchivesPresidenceService,
          useFactory: archivesPresidenceServiceStub
        },
        { provide: UpdateResultsService, useFactory: updateResultsServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(HomeArchivesPresidenceComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('setSortByField', () => {
    it('makes expected calls', () => {
      const labelValueStub: LabelValue = <any>{};
      const updateResultsServiceStub: UpdateResultsService = fixture.debugElement.injector.get(
        UpdateResultsService
      );
      spyOn(updateResultsServiceStub, 'triggerRefreshChange').and.callThrough();
      component.setSortByField(labelValueStub);
      expect(updateResultsServiceStub.triggerRefreshChange).toHaveBeenCalled();
    });
  });

  describe('setSortByOrder', () => {
    it('makes expected calls', () => {
      const labelValueStub: LabelValue = <any>{};
      const updateResultsServiceStub: UpdateResultsService = fixture.debugElement.injector.get(
        UpdateResultsService
      );
      spyOn(updateResultsServiceStub, 'triggerRefreshChange').and.callThrough();
      component.setSortByOrder(labelValueStub);
      expect(updateResultsServiceStub.triggerRefreshChange).toHaveBeenCalled();
    });
  });

  describe('add', () => {
    it('makes expected calls', () => {
      const matChipInputEventStub: MatChipInputEvent = <any>{};
      spyOn(component, 'search').and.callThrough();
      component.add(matChipInputEventStub);
      expect(component.search).toHaveBeenCalled();
    });
  });

  // describe('search', () => {
  //   it('makes expected calls', () => {
  //     const utilsServiceStub: UtilsService = fixture.debugElement.injector.get(
  //       UtilsService
  //     );
  //     spyOn(utilsServiceStub, 'setDate').and.callThrough();
  //     component.search();
  //     expect(utilsServiceStub.setDate).toHaveBeenCalled();
  //   });
  // });

  describe('clearAll', () => {
    it('makes expected calls', () => {
      spyOn(component, 'search').and.callThrough();
      component.clearAll();
      expect(component.search).toHaveBeenCalled();
    });
  });

  describe('init', () => {
    it('makes expected calls', () => {
      const utilsServiceStub: UtilsService = fixture.debugElement.injector.get(
        UtilsService
      );
      spyOn(utilsServiceStub, 'removeAccents').and.callThrough();
      component.init();
      expect(utilsServiceStub.removeAccents).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'init').and.callThrough();
      spyOn(component, 'search').and.callThrough();
      component.ngOnInit();
      expect(component.init).toHaveBeenCalled();
      expect(component.search).toHaveBeenCalled();
    });
  });
});

import {Pipe, PipeTransform} from '@angular/core';
@Pipe({name: 'keyValue'})
class KeyValueMockPipe implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}
