import {HttpErrorResponse} from '@angular/common/http';
import {UploadFidusignProximite2StepComponent} from './upload-fidusign-proximite2step/upload-fidusign-proximite2step.component';
import {NodesApiService} from '@alfresco/adf-core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {DateAdapter} from '@angular/material/core';
import moment from 'moment';
import {Subject} from 'rxjs';
import {finalize, take} from 'rxjs/operators';
import {FidusignService, YProximiteSignedForm} from 'services/fidusign.service';
import {SnackbarService} from 'services/snackbar.service';
import {UtilsService} from 'services/utils.service';
import {AchatSignedForm, JuridiqueSignedForm} from '../../../services/fidusign.service';
import {UploadFidusignAchat2Step} from './upload-fidusign-achat2step/upload-fidusign-achat2step.component';
import {UploadFidusignJuridique2Step} from './upload-fidusign-juridique2step/upload-fidusign-juridique2step.component';
import {UploadFidusignStep3Type1Component} from './upload-fidusign-step3-type1/upload-fidusign-step3-type1.component';
import {MatDialog} from '@angular/material/dialog';
import {MessageComponent} from '../../message/message.component';
import * as Sentry from "@sentry/angular-ivy";

export type EnvoyerEnGed = 'avec' | 'sans';

@Component({
  selector: 'app-upload-fidusign',
  templateUrl: './upload-fidusign.component.html',
  styleUrls: ['./upload-fidusign.component.scss'],
})
export class UploadFidusignComponent implements OnInit, OnDestroy {
  uploadForm: UntypedFormGroup;
  fileList: File[] = [];
  invalidFiles: any = [];
  isLoading = false;
  isCreationLoading = false;
  nodeList: string[] = [];
  failList: any = [];
  successList: any = [];
  createPending = false;
  createFailed = false;
  createSuccess = false;
  sendPending = false;
  sendSuccess = false;
  sendFailed = false;
  retryFailed = false;
  retryPending = false;
  retrySuccess = false;
  lastSentId: string;
  lastSignProperties: JuridiqueSignedForm | AchatSignedForm | YProximiteSignedForm;
  errorSend: any;
  resetUpload: boolean;
  step = 1;
  isUploadValid: boolean;
  errorRetry: any;
  timestampRetry: any;
  step2FieldName = 'step2';
  step3FieldName = 'step3';
  step2Component: ComponentPortal<any>;
  step3Component: ComponentPortal<any>;
  private destroy$ = new Subject();
  private step2Components = {
    'achat': new ComponentPortal(UploadFidusignAchat2Step),
    'juridique': new ComponentPortal(UploadFidusignJuridique2Step),
    'proximite': new ComponentPortal(UploadFidusignProximite2StepComponent)
  };
  private step3Components = {
    'achat': new ComponentPortal(UploadFidusignStep3Type1Component),
    'juridique': new ComponentPortal(UploadFidusignStep3Type1Component),
    'proximite': new ComponentPortal(UploadFidusignStep3Type1Component),
  };

  constructor(
    private fb: UntypedFormBuilder,
    private utils: UtilsService,
    private nodesApi: NodesApiService,
    private _adapter: DateAdapter<any>,
    private fidusignService: FidusignService,
    public dialog: MatDialog,
    private snack: SnackbarService
  ) {
    this.step2Component = this.step2Components[this.fidusignService.groupType];
    this.step3Component = this.step3Components[this.fidusignService.groupType];
    this.uploadForm = this.fb.group({});
  }

  ngOnInit() {
    this._adapter.setLocale('fr');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  continueStep(): void {
    this.step = this.step + 1;
  }

  goBack(): void {
    this.step = this.step - 1;

    if (this.step === 1) {
      this.reset2Step();
    }

    if (this.step === 2) {
      this.reset3Step();
    }
  }

  uploadValidation(isUploadValid: boolean): void {
    this.isUploadValid = isUploadValid;
  }

  onFilesChange(validFileList: Array<File>) {
    this.fileList = validFileList;
    this.fidusignService.fileList = validFileList;
  }

  onFilesInvalid(invalidFilesList: Array<File>) {
    this.invalidFiles = invalidFilesList;
  }

  closeSendMessage() {
    this.resetVariablesUsedToSaveEnvelope();
    this.resetForm();
    this.step = 1;
    this.destroy$.next();
    this.destroy$.complete();
  }

  noFutureFilter = (maxDate: Date | null): boolean => {
    return (moment(maxDate).diff(moment(new Date())) < 0);
  };

  async createDocument(fileList: File[], isRetry?: boolean) {
    this.isLoading = true;
    this.createPending = true;

    if (this.failList.length) {
      this.failList = [];
    }

    let lastLasSignProperties: JuridiqueSignedForm | AchatSignedForm | YProximiteSignedForm;

    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
      const renamedFile = new File([file], this.utils.formatFilename(file.name), {type: file.type});
      const form = this.getFieldsToSendIt(renamedFile);

      this.isCreationLoading = true;

      lastLasSignProperties = form;
      await this.fidusignService.createDocumentWithContent(form, renamedFile).toPromise()
        .then((resp) => {
          this.nodeList.push(resp.split(';')[0]);
          this.successList.push(renamedFile.name);
          this.isCreationLoading = false;
          Sentry.captureMessage(`document created: ${renamedFile.name}`, 'log');
        })
        .catch(() => {
          this.createFailed = true;
          this.failList.push(file);
          this.isCreationLoading = false;
        });
    }

    if (!this.failList.length) {
      this.createSuccess = true;
      this.sendPending = true;
      this.lastSignProperties = lastLasSignProperties;
      this.lastSentId = this.nodeList[0];
      this.step === 2 ? this.sendSuccess = true : this.sendDocumentForSigning(isRetry);
    }
  }

  sendDocumentForSigning(isRetry?: boolean): void {
    this.step3Group.get('fiduSign:callback').setValue(`http://ged-ws:8080/proxy/callbackDocumentSigned?uuid=${this.nodeListString}&status=%1`);

    const viewFieldsForm = (this.step3Group.get('viewFields') as UntypedFormGroup).getRawValue();
    const signataires = this.uploadForm.getRawValue()[this.step3FieldName].viewFields.signataires;
    const newSignaires = this.convertSignatairesToSendIt(signataires);
    const form = {...this.step3Group.getRawValue(), ...newSignaires};

    delete form.viewFields;

    if (isRetry) {
      this.retryPending = true;
    }

    this.fidusignService.sendDocumentForSigning(
      form,
      this.nodeListString,
      viewFieldsForm.authenticationParSMS,
      viewFieldsForm.respecterOrdreDeSignature,
      viewFieldsForm.signatureVisible,
      viewFieldsForm.visibleSigningMode,
      viewFieldsForm.posSigningPageTemplate,
      viewFieldsForm.signingPageTemplate
    )
      .pipe(
        take(1),
        finalize(() => {
          if (isRetry) {
            this.retryPending = false;
          }
        })
      )
      .subscribe({
        next: () => {
          if (isRetry) {
            this.retrySuccess = true;
          } else {
            this.sendSuccess = true;
          }
        },
        error: (resp: HttpErrorResponse) => {
          this.errorSend = this.utils.isJSON(resp.error?.message) ? JSON.parse(resp.error.message)?.label : resp.message;
          if (isRetry) {
            this.sendFailed = false;
            this.retryFailed = true;
            this.timestampRetry = resp?.error.timestamp;
          } else {
            this.sendFailed = true;
          }
        }
      });
  }

  retry() {
    if (this.failList.length) {
      this.createDocument(this.failList, true);
    }

    if (this.sendFailed) {
      this.sendDocumentForSigning(true);
    }
  }

  cancel(uuids: string[]) {
    uuids.forEach(id => this.nodesApi.deleteNode(id));
    const message = uuids.length > 1 ?
      'La demande est annulée : les documents ont été supprimés.' :
      'La demande est annulée : le document a été supprimé.';
    this.snack.openInfo(message);
    this.closeSendMessage();
  }

  private get step3Group(): UntypedFormGroup {
    return this.uploadForm.get(this.step3FieldName) as UntypedFormGroup;
  }

  private resetVariablesUsedToSaveEnvelope(): void {
    this.fileList = [];
    this.invalidFiles = [];
    this.nodeList = [];
    this.failList = [];
    this.successList = [];
    this.isLoading = false;
    this.createPending = false;
    this.createFailed = false;
    this.createSuccess = false;
    this.sendPending = false;
    this.sendSuccess = false;
    this.sendFailed = false;
    this.retryFailed = false;
    this.retryPending = false;
    this.retrySuccess = false;
    this.errorSend = undefined;
  }

  private resetForm(): void {
    this.uploadForm.removeControl(this.step2FieldName);
    this.uploadForm.removeControl(this.step3FieldName);
    this.resetUpload = true;
  }

  private reset3Step() {
    this.uploadForm.removeControl(this.step3FieldName);
  }

  private reset2Step() {
    this.uploadForm.removeControl(this.step2FieldName);
  }

  private getFieldsToSendIt(file: File): JuridiqueSignedForm | AchatSignedForm {
    this.step2Group.get('cmis:name').setValue(file.name);
    this.step2Group.get('cm:title').setValue(file.name.split('.')[0]);

    return this.step2Group.value as JuridiqueSignedForm | AchatSignedForm;
  }

  private convertSignatairesToSendIt(signataires: any[]): Object {
    return signataires.reduce((accumulator, currentSignataire, i) => {
      return {
        ...accumulator,
        [`fiduSign:prenomSignataire${i + 1}`]: currentSignataire['fiduSign:prenomSignataire'],
        [`fiduSign:nomSignataire${i + 1}`]: currentSignataire['fiduSign:nomSignataire'].toUpperCase(),
        [`fiduSign:mailSignataire${i + 1}`]: currentSignataire['fiduSign:mailSignataire'],
        [`fiduSign:telSignataire${i + 1}`]: currentSignataire['fiduSign:telSignataire'],
      };
    }, {});
  }

  private get nodeListString(): string {
    return this.nodeList.join(',');
  }

  private get step2Group(): UntypedFormGroup {
    return this.uploadForm.get(this.step2FieldName) as UntypedFormGroup;
  }

  private openDialog(fileList: File[]) {
    const messageValue = this.fidusignService.replaceSpecialCharactersAndRemoveLineBreak(this.uploadForm.get('step3').get('fp:message').value);
    const updatedMessage = messageValue.message;
    const replacedCharacters = messageValue.replacedChars;
    const dialogRef = this.dialog.open(MessageComponent, {
      data: {updatedMessage: updatedMessage, replacedCharacters: replacedCharacters}
    });

    dialogRef.afterClosed().subscribe((validated: boolean) => {
      if (validated) {
        this.createDocument(fileList);
      }
    });
  }
}
