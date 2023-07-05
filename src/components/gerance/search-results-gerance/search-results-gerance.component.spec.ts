import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FetchDataService } from 'services/fetch-data.service';
import { UtilsService } from 'services/utils.service';
import { MailService } from 'services/mail.service';
import { GroupService } from 'services/group.service';
import { Router } from '@angular/router';
import { PreviewService } from 'services/preview.service';
import { UpdateResultsService } from 'services/update-results.service';
import { FidusignService } from 'services/fidusign.service';
import { DownloadService } from 'services/download.service';
import { SnackbarService } from 'services/snackbar.service';
import { Columns, SearchResultsGeranceComponent } from './search-results-gerance.component';
import { utilsServiceStub } from 'services/utils.service.stub';
import { groupServiceStub } from 'services/group.service.stub';
import { fidusignServiceStub } from 'services/fidusign.service.stub';
import { fetchDataServiceStub } from 'services/fetch-data.stub';

describe(SearchResultsGeranceComponent.name, () => {
  let component: SearchResultsGeranceComponent;
  let fixture: ComponentFixture<SearchResultsGeranceComponent>;

  beforeEach(() => {
    const mailServiceStub = () => ({});
    const routerStub = () => ({ navigate: array => ({}) });
    const previewServiceStub = () => ({});
    const updateResultsServiceStub = () => ({
      mustRefreshChange: { subscribe: f => f({}) },
      triggerRefreshChange: arg => ({})
    });
    const downloadServiceStub = () => ({});
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchResultsGeranceComponent],
      providers: [
        { provide: FetchDataService, useFactory: fetchDataServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: MailService, useFactory: mailServiceStub },
        { provide: GroupService, useFactory: groupServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: PreviewService, useFactory: previewServiceStub },
        { provide: UpdateResultsService, useFactory: updateResultsServiceStub },
        { provide: FidusignService, useFactory: fidusignServiceStub },
        { provide: DownloadService, useFactory: downloadServiceStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SearchResultsGeranceComponent);
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
  //     spyOn(component, 'shouldMergeData').and.callThrough();
  //     spyOn(fetchDataServiceStub, 'pendingGerance').and.callThrough();
  //     (<jasmine.Spy>component.search).and.callThrough();
  //     component.search();
  //     expect(component.shouldMergeData).toHaveBeenCalled();
  //     expect(fetchDataServiceStub.pendingGerance).toHaveBeenCalled();
  //   });
  // });
});
