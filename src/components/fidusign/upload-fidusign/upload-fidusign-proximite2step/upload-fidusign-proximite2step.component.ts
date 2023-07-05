import { ValueLabelItem } from './../../../../app/modules/shared/shared-components/autocomplete/autocomplete.component';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FidusignService} from 'services/fidusign.service';
import {UserService} from 'services/user.service';
import {EnvoyerEnGed} from '../upload-fidusign.component';

@Component({
  selector: 'app-upload-fidusign-proximite2step',
  templateUrl: './upload-fidusign-proximite2step.component.html',
  styleUrls: ['./upload-fidusign-proximite2step.component.scss'],
})
export class UploadFidusignProximite2StepComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  destroy$ = new Subject();
  destroyEnvoyerEnGed$ = new Subject();
  proximiteSegmentMarcheList$: Observable<ValueLabelItem[]>;
  dateNow = new Date();

  constructor(
    private rootFormGroup: FormGroupDirective,
    public fidusign: FidusignService,
    private userService: UserService,
    private fb: UntypedFormBuilder,
  ) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control;
    this.createStep2Fields();
    this.envoyerEnGedHandler();
    this.proximiteSegmentMarcheList$ = this.fidusign.getProximiteSegmentMarcheList();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createStep2Fields(): void {
    this.form.addControl('step2',
      this.fb.group({
        'cm:description': ['', [Validators.required, Validators.maxLength(100)]],
        'fiducial:domainContainerSousFamille': 'yproximite_bon_commande',
        'fiducial:domainContainerBranche': 'YPROXIMITE',
        'fiducial:domainContainerSociete': 'YPROXIMITE',
        'fiducial:domainContainerFamille': 'yproximite_bon_commande',
        'cm:title': '',
        'cmis:name': '',
        'yproximite:nomClient': ['', Validators.required],
        'fiducial:domainContainerApplication': ['', Validators.required],
        'yproximite:dateValiditeBonCommande': ['', Validators.required],
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
