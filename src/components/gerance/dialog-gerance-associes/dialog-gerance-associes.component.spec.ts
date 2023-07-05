import { MaterialModule } from './../../../app/modules/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UpdateDocumentService } from 'services/update-document.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogGeranceAssociesComponent } from './dialog-gerance-associes.component';
import { updateDocumentServiceStub } from 'services/update-document.service.stub';

describe(DialogGeranceAssociesComponent.name, () => {
  let component: DialogGeranceAssociesComponent;
  let fixture: ComponentFixture<DialogGeranceAssociesComponent>;

  beforeEach(() => {
    const matDialogRefStub = () => ({
      backdropClick: () => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      close: isConfirmation => ({})
    });
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DialogGeranceAssociesComponent],
      providers: [
        {
          provide: UpdateDocumentService,
          useFactory: updateDocumentServiceStub
        },
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    });
    spyOn(DialogGeranceAssociesComponent.prototype, 'closeDialog');
    fixture = TestBed.createComponent(DialogGeranceAssociesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(
        DialogGeranceAssociesComponent.prototype.closeDialog
      ).toHaveBeenCalled();
    });
  });

  // describe('updateDocuments', () => {
  //   it('makes expected calls', () => {
  //     const updateDocumentServiceStub: UpdateDocumentService = fixture.debugElement.injector.get(
  //       UpdateDocumentService
  //     );
  //     (<jasmine.Spy>component.closeDialog).calls.reset();
  //     spyOn(updateDocumentServiceStub, 'updateATraiter').and.callThrough();
  //     component.updateDocuments();
  //     expect(component.closeDialog).toHaveBeenCalled();
  //     expect(updateDocumentServiceStub.updateATraiter).toHaveBeenCalled();
  //   });
  // });
});
