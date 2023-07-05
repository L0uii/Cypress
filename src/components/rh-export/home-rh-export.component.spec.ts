import { RhExportService } from './../../services/rh-export.service';
import { groupServiceStub } from 'services/group.service.stub';
import { GroupService } from 'services/group.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'app/modules/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeRhExportComponent } from './home-rh-export.component';
import { of } from 'rxjs';
import { UtilsService } from 'services/utils.service';
import { utilsServiceStub } from 'services/utils.service.stub';
import { SnackbarService } from 'services/snackbar.service';
import { RouterTestingModule } from '@angular/router/testing';

describe(HomeRhExportComponent.name, () => {
  let component: HomeRhExportComponent;
  let fixture: ComponentFixture<HomeRhExportComponent>;
  let router: Router;

  const activatedRouteStub = () => ({
    snapshot: { url: [{path: ''}] }
  });
  const rhExportServiceStub = () => ({ 
    getDocumentsForExport: of({}),
    getRhExportListeDeMarcheFormation:() => of([{
      label: 'label',
      famille: 'famille',
      option: true,
    }]),
    getRhExportListeDeMarcheFormationDAP:() => of([{
      label: 'label',
      famille: 'famille',
      option: true,
    }])
  });
  const snackbarServiceStub = () => ({
    openSnackBar: (string, string1, string2) => ({}),
    openActionSnackBar: () => {
      return {
        onAction: () => of({}),
        dismiss: () => {}
      }
    }
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useFactory: activatedRouteStub
        },
        {
          provide: GroupService,
          useFactory: groupServiceStub
        },
        {
          provide: RhExportService,
          useFactory: rhExportServiceStub
        },
        {
          provide: UtilsService,
          useFactory: utilsServiceStub
        },
        { provide: SnackbarService, useFactory: snackbarServiceStub },
      ],
      declarations: [HomeRhExportComponent]
    });
    fixture = TestBed.createComponent(HomeRhExportComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should test onInit method', () => {
    spyOn(component, 'getLists');
    component.ngOnInit();

    expect(component.getLists).toHaveBeenCalled();
  });

  it('should test get the lists', () => {
    component.getLists();

    expect(component.exportedDocumentLabelMapper).toBeDefined();
    expect(component.exportedOptionalDocumentLabelMapper).toBeDefined();
  });
});
