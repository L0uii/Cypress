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
import { Columns, SearchFidusignComponent } from './search-fidusign.component';
import { utilsServiceStub } from 'services/utils.service.stub';
import { groupServiceStub } from 'services/group.service.stub';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fidusignServiceStub } from 'services/fidusign.service.stub';
import { fetchDataServiceStub } from 'services/fetch-data.stub';

describe(SearchFidusignComponent.name, () => {
  let component: SearchFidusignComponent;
  let fixture: ComponentFixture<SearchFidusignComponent>;

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
      declarations: [SearchFidusignComponent],
      imports: [HttpClientTestingModule],
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
    fixture = TestBed.createComponent(SearchFidusignComponent);
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
  //     spyOn(fetchDataServiceStub, 'pending').and.callThrough();
  //     (<jasmine.Spy>component.search).and.callThrough();
  //     component.search();
  //     expect(component.shouldMergeData).toHaveBeenCalled();
  //     expect(fetchDataServiceStub.pending).toHaveBeenCalled();
  //   });
  // });

  // describe('ngOnChanges', () => {
  //   it('makes expected calls', () => {
  //     (<jasmine.Spy>component.handleSearchResponse).calls.reset();
  //     component.ngOnChanges();
  //     expect(component.handleSearchResponse).toHaveBeenCalled();
  //   });
  // });
});
