import { MaterialModule } from './../../../app/modules/shared/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'services/utils.service';
import { FormsModule } from '@angular/forms';
import { ChampSalariesComponent } from './champ-salaries.component';
import { utilsServiceStub } from 'services/utils.service.stub';
import { RouterTestingModule } from '@angular/router/testing';

describe(ChampSalariesComponent.name, () => {
  let component: ChampSalariesComponent;
  let fixture: ComponentFixture<ChampSalariesComponent>;
  let router: Router;

  const liste = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, RouterTestingModule.withRoutes([])],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ChampSalariesComponent],
      providers: [
        { provide: UtilsService, useFactory: utilsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ChampSalariesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('makes expected calls currentValue none', () => {
      const previousValue = '1';
      const currentValue = null;

      const changesObj: SimpleChanges = {
        numeroDossier: new SimpleChange(previousValue, currentValue, false),
      };

      spyOn(component, 'destroyEmployee');
      component.ngOnChanges(changesObj);
      expect(component.destroyEmployee).toHaveBeenCalled();
    });

    it('makes expected calls currentValue different', () => {
      const previousValue = '1';
      const currentValue = '2';

      const changesObj: SimpleChanges = {
        numeroDossier: new SimpleChange(previousValue, currentValue, false),
      };

      spyOn(component, 'destroyEmployee');
      component.ngOnChanges(changesObj);
      expect(component.destroyEmployee).not.toHaveBeenCalled(); // first change
    });

    it('makes expected calls input', () => {
      const previousValue = { value: '1' };
      const currentValue = { value: '' };

      const changesObj: SimpleChanges = {
        input: new SimpleChange(previousValue, currentValue, false),
      };

      spyOn(component, 'destroyEmployee');
      spyOn(component, 'searchEmployees');

      component.ngOnChanges(changesObj);

      expect(component.destroyEmployee).toHaveBeenCalled();
      expect(component.searchEmployees).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('makes expected calls', () => {
      spyOn(component, 'destroyEmployee');
      component.ngOnDestroy();
      expect(component.destroyEmployee).toHaveBeenCalled();
    });
  });

  describe('filterEmployes', () => {
    it('makes expected calls', () => {
      component.liste = ['x'];
      component.filterEmployes('x');
      expect(component.sortMaidenNames(component.filteredListe).length).toBeGreaterThan(0);
    });
  });

  describe('sortMaidenNames', () => {
    it('makes expected calls case 1', () => {
     const employeeList = [{
      employeeName: 'name',
      employeeFirstName: 'name',
      employeeCommonName: 'name'
     }];

     expect(component.sortMaidenNames(employeeList).length).toBeGreaterThan(0);
    });

    it('makes expected calls not case 2', () => {
      const employeeList = [{
       employeeName: 'a',
       employeeFirstName: 'b',
       employeeCommonName: 'c'
      }];
 
      expect(component.sortMaidenNames(employeeList).length).toBeGreaterThan(0);
     });
  });

  describe('select', () => {
    it('makes expected calls', () => {
     spyOn(component.selected, 'emit');
     component.select('x');

     expect(component.selected.emit).toHaveBeenCalledWith('x');
    });
  });


  describe('searchEmployees', () => {
    it('makes expected calls', () => {
      component.numeroDossier = '123';
      const employeeList = [{
        employeeName: 'a',
        employeeFirstName: 'b',
        employeeCommonName: 'a'
      }];
      const okResponse = new Response(JSON.stringify(employeeList), { status: 200, statusText: 'OK', });
      spyOn(window, 'fetch').and.resolveTo(okResponse);
      spyOn(component, 'sortMaidenNames');

      component.searchEmployees();
      
      expect(window.fetch).toHaveBeenCalled();
    });
  });

  describe('searchEmployees', () => {
    it('makes expected calls 500', () => {
      component.numeroDossier = '123';
      
      const okResponse = new Response(JSON.stringify({ status: 500 }), {});
      spyOn(window, 'fetch').and.resolveTo(okResponse);

      component.searchEmployees();

      expect(window.fetch).toHaveBeenCalled();
    });
  });

  describe('searchEmployees', () => {
    it('makes expected calls error', () => {
      component.numeroDossier = '123';
      
      const noOkResponse = new Response(JSON.stringify({}), { status: 500, statusText: 'ERROR', });
      spyOn(window, 'fetch').and.rejectWith(noOkResponse)

      component.searchEmployees();

      expect(window.fetch).toHaveBeenCalled();
    });
  });

  describe('searchEmployees', () => {
    it('makes expected calls no dossier number', () => {
      component.numeroDossier = '';
      component.update = true;
      component.searchEmployees();

      expect(component.errors.numeroUpdate).toBeTrue();
    });
  });

  describe('onFocusSalarie', () => {
    it('makes expected calls no dossier number', () => {
      const event = { preventDefault: () => {} };
      const trigger = { openPanel: () => {} };

      const eventSpy = spyOn(event, 'preventDefault')
      const triggerSpy = spyOn(trigger, 'openPanel')
      
      component.onFocusSalarie(event, trigger);

      expect(eventSpy).toHaveBeenCalled();
      expect(triggerSpy).toHaveBeenCalled();
    });
  });
  
});
