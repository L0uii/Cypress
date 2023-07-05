import { MaterialModule } from './../../../app/modules/shared/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FetchDataService } from 'services/fetch-data.service';
import { UtilsService } from 'services/utils.service';
import { FormsModule } from '@angular/forms';
import { SearchCustomerComponent } from './search-customer.component';
import { utilsServiceStub } from 'services/utils.service.stub';
import { fetchDataServiceStub } from 'services/fetch-data.stub';

describe(SearchCustomerComponent.name, () => {
  let component: SearchCustomerComponent;
  let fixture: ComponentFixture<SearchCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchCustomerComponent],
      providers: [
        { provide: FetchDataService, useFactory: fetchDataServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SearchCustomerComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('search', () => {
  //   it('makes expected calls', () => {
  //     const fetchDataServiceStub: FetchDataService = fixture.debugElement.injector.get(
  //       FetchDataService
  //     );
  //     const utilsServiceStub: UtilsService = fixture.debugElement.injector.get(
  //       UtilsService
  //     );
  //     spyOn(fetchDataServiceStub, 'conseilCustomers').and.callThrough();
  //     spyOn(utilsServiceStub, 'removeAccents').and.callThrough();
  //     component.search();
  //     expect(fetchDataServiceStub.conseilCustomers).toHaveBeenCalled();
  //     expect(utilsServiceStub.removeAccents).toHaveBeenCalled();
  //   });
  // });
});
