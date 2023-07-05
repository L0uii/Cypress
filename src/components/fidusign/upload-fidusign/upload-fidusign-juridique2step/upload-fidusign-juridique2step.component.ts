import { ValueLabelItem } from './../../../../app/modules/shared/shared-components/autocomplete/autocomplete.component';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FidusignService} from 'services/fidusign.service';
import {UserService} from 'services/user.service';
import {EnvoyerEnGed} from '../upload-fidusign.component';

@Component({
  selector: 'app-upload-fidusign-juridique2step',
  templateUrl: './upload-fidusign-juridique2step.component.html',
  styleUrls: ['./upload-fidusign-juridique2step.component.scss'],
})
export class UploadFidusignJuridique2Step implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  destroy$ = new Subject();
  destroyEnvoyerEnGed$ = new Subject();
  brancheActiviteList$: Observable<string[]>;
  entiteJuridiqueList$: Observable<ValueLabelItem[]>;
  natureOperationList$: Observable<string[]>;
  natureDocumentList$: Observable<string[]>;
  dateNow = new Date();

  constructor(
    private rootFormGroup: FormGroupDirective,
    public fidusign: FidusignService,
    private userService: UserService,
    private fb: UntypedFormBuilder,
  ) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control;
    this.brancheActiviteList$ = this.fidusign.getBrancheActiviteList();
    this.entiteJuridiqueList$ = this.fidusign.getEntiteJuridiqueList();
    this.natureOperationList$ = this.fidusign.getNatureOperationList();
    this.natureDocumentList$ = this.fidusign.getNatureDocumentList();
    this.createStep2Fields();
    this.envoyerEnGedHandler()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createStep2Fields(): void {
    this.form.addControl('step2',
      this.fb.group({
        'cm:description': ['', [Validators.required, Validators.maxLength(100)]],
        'fiducial:domainContainerSousFamille': 'juridique_operation_droit_societes_signature',
        'cm:title': '',
        'cmis:name': '',
        'fiducial:domainContainerBranche': 'STAFFING',
        'fiducial:domainContainerSociete': 'DIR_JURIDIQUE',
        'fiducial:domainContainerApplication': 'JURIDIQUE_FIRME',
        'juridique:droitSocBrancheActivite': ['', Validators.required],
        'fiducial:domainContainerFamille': ['', Validators.required],
        'juridique:droitSocNatureOperation': ['', Validators.required],
        'juridique:droitSocNatureDocument': '',
        'juridique:droitSocDateOperation': ['', Validators.required],
        'juridique:droitSocDatePriseEffet': ''
      })
    );
  }

  private get step2Group(): UntypedFormGroup {
    return this.form.get('step2') as UntypedFormGroup;
  }

  private envoyerEnGedHandler(): void {
    if (this.step2Group.contains('envoyerEnGed')) {
      if (this.fidusign.fileList.length > 1) {
        this.step2Group.removeControl('envoyerEnGed');
        this.destroyEnvoyerEnGed$.next();
        this.destroyEnvoyerEnGed$.complete();
        return;
      }
      this.envoyerEnGedChanges();
    } else if (this.fidusign.fileList.length === 1) {
      this.step2Group.addControl('envoyerEnGed', this.fb.control('', Validators.required));
      this.envoyerEnGedChanges();
    }
  }

  private envoyerEnGedChanges(): void {
    this.step2Group.get('envoyerEnGed').valueChanges.pipe(
      takeUntil(this.destroy$),
      takeUntil(this.destroyEnvoyerEnGed$)
    )
    .subscribe((envoyerEnGed: EnvoyerEnGed) => {
      this.dateCertificationControlHandler(envoyerEnGed);

      if (envoyerEnGed === 'sans' && !this.step2Group.get('fiduSign:nomEmetteur')) {
        this.setEmetteur(this.step2Group);
      }
    });
  }

  private setEmetteur(formGroup: UntypedFormGroup): void {
    if (!formGroup.get('fiduSign:nomEmetteur')) {
      formGroup.setControl('fiduSign:nomEmetteur', this.fb.control(this.userService.currentUser.lastName));
      formGroup.setControl('fiduSign:prenomEmetteur', this.fb.control(this.userService.currentUser.firstName));
      formGroup.setControl('fiduSign:mailEmetteur', this.fb.control(this.userService.currentUser.email));
    }
  }

  private dateCertificationControlHandler(envoyerEnGed: EnvoyerEnGed): void {
    if (envoyerEnGed === 'avec' || this.step2Group.get('fiduSign:dateCertification')) {
      this.step2Group.removeControl('fiduSign:dateCertification');
      return;
    }

    if (!this.step2Group.get('fiduSign:dateCertification')) {
      this.step2Group.addControl('fiduSign:dateCertification', this.fb.control('', Validators.required));
    }
  }

  onKeyDown(e: KeyboardEvent): void {
    e.preventDefault();
  }
}
