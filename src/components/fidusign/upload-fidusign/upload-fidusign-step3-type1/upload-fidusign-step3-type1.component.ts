import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  FormGroupDirective,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';
import {UserService} from 'services/user.service';
import {UtilsService} from 'services/utils.service';
import {FidusignService, FidusignSignataire} from '../../../../services/fidusign.service';

interface ControlObjectValue {
  value: string;
  disabled: boolean;
}

@Component({
  selector: 'app-upload-fidusign-step3-type1',
  templateUrl: './upload-fidusign-step3-type1.component.html',
  styleUrls: ['./upload-fidusign-step3-type1.component.scss'],
})
export class UploadFidusignStep3Type1Component implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  destroy$ = new Subject();
  destinatairesCopie$: Observable<string[]>;
  signatairesFavorisNameList$: Observable<string[]>;
  signatairesFavorisList: FidusignSignataire[];
  disabledFieldTooltipText = 'Le choix par défaut est non modifiable pour votre profil.';
  step3FieldName = 'step3';
  maxSignataires = 4;
  dernierePageMessage = `Cette option nécessite, au préalable, d'avoir intégré au pdf via Adobe pro, les champs normés suivants : un champ par signataire (nommé fiducial_signataireX) et un champ pour le certificat (nommé fiducial_certificat)`;
  signaturePageTemplateValues = {
    achat: 'ACHAT',
    proximite: 'YPROXIMITE',
    juridique: 'JURIDIQUEFIRME'
  };

  private signatairesFavorisNameLists = {
    'juridique': this.getSignatairesFavorisList(this.fidusign.getSignatairesJuridiqueFavorisList()),
    'achat': this.getSignatairesFavorisList(this.fidusign.getSignatairesAchatFavorisList()),
    'proximite': undefined
  };
  private destinatairesCopieLists = {
    'juridique': this.fidusign.getJuridiqueDestinatairesCopie(),
    'achat': this.fidusign.getAchatsDestinatairesCopie(),
    'proximite': this.fidusign.getProximiteDestinatairesCopie()
  };
  private authenticationParSMSValues = {
    'juridique': this.getControlValue('0', false),
    'achat': this.getControlValue('0', true),
    'proximite': this.getControlValue('0', true)
  };
  private signatureVisibleValues = {
    'juridique': this.getControlValue('0', false),
    'achat': this.getControlValue('1', true),
    'proximite': this.getControlValue('1', true)
  };
  private respecterOrdreDeSignatureValues = {
    'juridique': this.getControlValue('0', false),
    'achat': this.getControlValue('0', true),
    'proximite': this.getControlValue('0', true)
  };
  private typeDeSignatureVisibleValues = {
    'juridique': this.getControlValue('DEFAULT', false),
    'achat': this.getControlValue('DEFAULT', true),
    'proximite': this.getControlValue('DEFAULT', true)
  };
  private origineValues = {
    'juridique': 'juridique',
    'achat': 'achats',
    'proximite': 'yproximite'
  };

  constructor(
    private rootFormGroup: FormGroupDirective,
    public fidusign: FidusignService,
    private userService: UserService,
    private utils: UtilsService,
    private fb: UntypedFormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.rootFormGroup.control;
    this.generate3StepLists();
    this.create3StepFields();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addSignataire(signataire?: FidusignSignataire): void {
    if (this.signatairesFormArray.controls.length < this.maxSignataires) {
      this.signatairesFormArray.push(this.createSignataireGroup(signataire));
    }
  }

  removeSignataire(index: number): void {
    const signatairesOptionsField = this.step3Group.get(['viewFields', 'signatairesOptions']) as UntypedFormControl;
    const newOptions = signatairesOptionsField.value && signatairesOptionsField.value
      .filter((signataireName: string) =>
        this.theresNoSignataireNameOnSignataireGroup(this.signatairesFormArray, index, signataireName));

    signatairesOptionsField.setValue(newOptions, {emitEvent: false});
    this.signatairesFormArray.removeAt(index);
  }

  get authenticationParSMSField(): UntypedFormControl {
    return this.form.get([this.step3FieldName, 'viewFields', 'authenticationParSMS']) as UntypedFormControl;
  }

  get visibleSigningModeField(): UntypedFormControl {
    return this.form.get([this.step3FieldName, 'viewFields', 'visibleSigningMode']) as UntypedFormControl;
  }

  get posSigningPageTemplateField(): UntypedFormControl {
    return this.form.get([this.step3FieldName, 'viewFields', 'posSigningPageTemplate']) as UntypedFormControl;
  }

  get signatureVisibleField(): UntypedFormControl {
    return this.form.get([this.step3FieldName, 'viewFields', 'signatureVisible']) as UntypedFormControl;
  }

  get respecterOrdreDeSignatureField(): UntypedFormControl {
    return this.form.get([this.step3FieldName, 'viewFields', 'respecterOrdreDeSignature']) as UntypedFormControl;
  }

  private create3StepFields(): void {
    this.form.addControl(this.step3FieldName,
      this.fb.group({
        'fp:message': '',
        'cm:description': this.form.get(['step2', 'cm:description']).value,
        'fiduSign:origine': this.origineValues[this.fidusign.groupType],
        'fiduSign:callback': '',
        'fiduSign:mailCopie': '',
        viewFields: this.fb.group({
          signatairesOptions: [],
          signataires: this.fb.array([], this.atLeastOneValidator),
          authenticationParSMS: [this.authenticationParSMSValues[this.fidusign.groupType], Validators.required],
          signatureVisible: [this.signatureVisibleValues[this.fidusign.groupType], Validators.required],
          respecterOrdreDeSignature: [this.respecterOrdreDeSignatureValues[this.fidusign.groupType], Validators.required],
          visibleSigningMode: this.typeDeSignatureVisibleValues[this.fidusign.groupType],
          posSigningPageTemplate: 'START',
          signingPageTemplate: this.signaturePageTemplateValues[this.fidusign.groupType]
        })
      })
    );

    this.setEmetteur(this.step3Group);
    this.signatairesOptionsChanges();
    this.authenticationParSMSChanges();
    this.signatureVisibleFieldChanges();
    this.signatairesFormArray.push(this.createSignataireGroup());
  }

  private signatureVisibleFieldChanges(): void {
    this.signatureVisibleField.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(signatureVisible => {
        if (!signatureVisible) {
          this.visibleSigningModeField.setValue('DEFAULT');
          this.posSigningPageTemplateField.setValue('START');
        }
      });
  }

  private generate3StepLists(): void {
    this.signatairesFavorisNameList$ = this.signatairesFavorisNameLists[this.fidusign.groupType];
    this.destinatairesCopie$ = this.destinatairesCopieLists[this.fidusign.groupType];
  }

  private atLeastOneValidator(control: AbstractControl): ValidationErrors {
    const invalid = !(control as UntypedFormArray).controls.length;
    return invalid ? {atLeastOneError: true} : null;
  }

  private get isSMSRequired(): boolean {
    return this.form.getRawValue()[this.step3FieldName].viewFields.authenticationParSMS === '1';
  }

  private get step3Group(): UntypedFormGroup {
    return this.form.get(this.step3FieldName) as UntypedFormGroup;
  }

  private get signatairesFormArray(): UntypedFormArray {
    return this.step3Group.get(['viewFields', 'signataires']) as UntypedFormArray;
  }

  private get getTelSignataireControl(): UntypedFormControl {
    return this.fb.control('', Validators.required);
  }

  private getControlValue(value: string, disabled: boolean): ControlObjectValue {
    return {value: value, disabled: disabled};
  }

  private createSignataireGroup(signataire?: FidusignSignataire): UntypedFormGroup {
    if (this.isSMSRequired) {
      return this.fb.group({
        'fiduSign:prenomSignataire': [{value: signataire ? signataire.name : '', disabled: !!signataire}, Validators.required],
        'fiduSign:nomSignataire': [{value: signataire ? signataire.lastName : '', disabled: !!signataire}, Validators.required],
        'fiduSign:mailSignataire': [signataire ? signataire.email : '', [Validators.required, Validators.email]],
        'fiduSign:telSignataire': this.getTelSignataireControl,
        hasGenerateFromList: !!signataire
      });
    }

    return this.fb.group({
      'fiduSign:prenomSignataire': [{value: signataire ? signataire.name : '', disabled: !!signataire}, Validators.required],
      'fiduSign:nomSignataire': [{value: signataire ? signataire.lastName : '', disabled: !!signataire}, Validators.required],
      'fiduSign:mailSignataire': [signataire ? signataire.email : '', [Validators.required, Validators.email]],
      hasGenerateFromList: !!signataire
    });
  }

  private getSignatairesFavorisList(signataires$: Observable<FidusignSignataire[]>): Observable<string[]> {
    return signataires$.pipe(
      tap(signataires => this.signatairesFavorisList = signataires),
      map(signataires => signataires.sort((a, b) => this.utils.sortStrings(a.lastName, a.lastName))),
      map(signataires => signataires.map(signataire => `${signataire.name} ${signataire.lastName}`)),
    );
  }

  private setEmetteur(formGroup: UntypedFormGroup): void {
    if (!formGroup.get('fiduSign:nomEmetteur')) {
      formGroup.setControl('fiduSign:nomEmetteur', this.fb.control(this.userService.currentUser.lastName));
      formGroup.setControl('fiduSign:prenomEmetteur', this.fb.control(this.userService.currentUser.firstName));
      formGroup.setControl('fiduSign:mailEmetteur', this.fb.control(this.userService.currentUser.email));
    }
  }

  private signatairesOptionsChanges(): void {
    this.step3ViewFieldsChanges('signatairesOptions')
      .subscribe((signataires: string[]) => {
        this.signatairesHandler(signataires);
      });
  }

  private step3ViewFieldsChanges(fieldName: string): Observable<any> {
    return this.step3Group.get(['viewFields', fieldName]).valueChanges
      .pipe(
        takeUntil(this.destroy$)
      );
  }

  private signatairesHandler(signataires: string[]): void {
    this.signatairesFormArray.controls.forEach((formGroup: UntypedFormGroup, i) => {
      if (this.hasSomeSignataireRemoved(formGroup, signataires)) {
        this.signatairesFormArray.removeAt(i);
        if (!this.signatairesFormArray.getRawValue().length) {
          this.signatairesFormArray.push(this.createSignataireGroup());
        }
      }
    });

    signataires
      .filter(signataire => this.isThisANewSignataire(signataire, this.signatairesFormArray))
      .forEach(signataireName => this.signataireAddHandler(this.signatairesFormArray, signataireName));
  }

  private hasSomeSignataireRemoved(formGroup: UntypedFormGroup, signataires: string[]): boolean {
    const groupValue = formGroup.getRawValue();

    return groupValue.hasGenerateFromList && signataires && (this.hasNoSignataireControlInSelectedSignataireFavoris(signataires, groupValue));
  }

  private isThisANewSignataire(signataire: string, signatairesForm: UntypedFormArray): boolean {
    return !signatairesForm.controls.some(s => {
      const {firstName, lastName} = {
        firstName: s.get('fiduSign:prenomSignataire').value,
        lastName: s.get('fiduSign:nomSignataire').value
      };

      return `${firstName} ${lastName}` === signataire;
    });
  }

  private signataireAddHandler(signatairesForm: UntypedFormArray, signataireName: string): void {
    const foundSignataire = this.signatairesFavorisList.find(signataireObj => signataireName === `${signataireObj.name} ${signataireObj.lastName}`);
    const foundEmptySignatairesForm = signatairesForm.controls.find((signataireGroup: UntypedFormGroup) =>
      this.isSignataireGroupEmpty(signataireGroup)) as UntypedFormGroup;

    if (foundEmptySignatairesForm) {
      this.updateEmptySignataire(foundEmptySignatairesForm, foundSignataire);
      return;
    }

    this.addSignataire(foundSignataire);
  }

  private hasNoSignataireControlInSelectedSignataireFavoris(signataires: string[], groupValue: any): boolean {
    return !signataires.some(s => s === `${groupValue['fiduSign:prenomSignataire']} ${groupValue['fiduSign:nomSignataire']}`);
  }

  private theresNoSignataireNameOnSignataireGroup(signatairesForm: UntypedFormArray, index: number, signataireName: string): boolean {
    const {firstName, lastName} = {
      firstName: signatairesForm.at(index).get('fiduSign:prenomSignataire').value,
      lastName: signatairesForm.at(index).get('fiduSign:nomSignataire').value
    };

    return `${firstName} ${lastName}` !== signataireName;
  }

  private isSignataireGroupEmpty(signataire: UntypedFormGroup): boolean {
    const isFieldEmpty = (fieldName: string): boolean => signataire.get(fieldName).value === '';
    const basicCondition = isFieldEmpty('fiduSign:prenomSignataire') && isFieldEmpty('fiduSign:nomSignataire') && isFieldEmpty('fiduSign:mailSignataire');

    return this.isSMSRequired
      ? basicCondition && isFieldEmpty('fiduSign:telSignataire')
      : basicCondition;
  }

  private updateEmptySignataire(foundEmptySignatairesForm: UntypedFormGroup, foundSignataire: FidusignSignataire): void {
    foundEmptySignatairesForm.get('fiduSign:prenomSignataire').setValue(foundSignataire.name);
    foundEmptySignatairesForm.get('fiduSign:nomSignataire').setValue(foundSignataire.lastName);
    foundEmptySignatairesForm.get('fiduSign:mailSignataire').setValue(foundSignataire.email);
    foundEmptySignatairesForm.get('hasGenerateFromList').setValue(true);
    foundEmptySignatairesForm.get('fiduSign:prenomSignataire').disable();
    foundEmptySignatairesForm.get('fiduSign:nomSignataire').disable();
  }

  private authenticationParSMSChanges(): void {
    this.step3ViewFieldsChanges('authenticationParSMS')
      .subscribe((authenticationParSMS: '0' | '1') => {
        if (authenticationParSMS === '1') {
          this.signatairesFormArray.controls
            .filter((signataires: UntypedFormGroup) => !signataires.get('fiduSign:telSignataire'))
            .forEach((signataires: UntypedFormGroup) => signataires.addControl('fiduSign:telSignataire', this.getTelSignataireControl));
          return;
        }

        this.signatairesFormArray.controls
          .filter((signataires: UntypedFormGroup) => signataires.get('fiduSign:telSignataire'))
          .forEach((signataires: UntypedFormGroup) => signataires.removeControl('fiduSign:telSignataire'));
      });
  }
}
