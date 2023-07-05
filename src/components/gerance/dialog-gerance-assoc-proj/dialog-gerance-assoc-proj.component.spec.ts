import { MaterialModule } from './../../../app/modules/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UpdateDocumentService } from 'services/update-document.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogGeranceAssocProjComponent } from './dialog-gerance-assoc-proj.component';
import { updateDocumentServiceStub } from 'services/update-document.service.stub';

describe(DialogGeranceAssocProjComponent.name, () => {
  let component: DialogGeranceAssocProjComponent;
  let fixture: ComponentFixture<DialogGeranceAssocProjComponent>;
  beforeEach(() => {
    const matDialogRefStub = () => ({
      backdropClick: () => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      close: isConfirmation => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DialogGeranceAssocProjComponent],
      imports: [MaterialModule],
      providers: [
        {
          provide: UpdateDocumentService,
          useFactory: updateDocumentServiceStub
        },
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    });
    spyOn(DialogGeranceAssocProjComponent.prototype, 'closeDialog');
    fixture = TestBed.createComponent(DialogGeranceAssocProjComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(
        DialogGeranceAssocProjComponent.prototype.closeDialog
      ).toHaveBeenCalled();
    });
  });

  // describe('updateDocuments', () => {
  //   it('makes expected calls', () => {
  //     const updateDocumentServiceStub: UpdateDocumentService = fixture.debugElement.injector.get(
  //       UpdateDocumentService
  //     );
  //     (<jasmine.Spy>component.closeDialog).calls.reset();
  //     spyOn(updateDocumentServiceStub, 'updateProjOK').and.callThrough();
  //     component.updateDocuments();
  //     expect(component.closeDialog).toHaveBeenCalled();
  //     expect(updateDocumentServiceStub.updateProjOK).toHaveBeenCalled();
  //   });
  // });
});
