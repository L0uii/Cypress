import { ValueLabelItem } from './../../../../app/modules/shared/shared-components/autocomplete/autocomplete.component';
import {EnvoyerEnGed} from './../upload-fidusign.component';
import {UserService} from 'services/user.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FidusignCategorie} from './../../../../services/fidusign.service';
import {filter, map, takeUntil, tap} from 'rxjs/operators';
import {FidusignService} from 'services/fidusign.service';
import {Observable, Subject} from 'rxjs';
import {UntypedFormBuilder, UntypedFormGroup, FormGroupDirective, Validators} from '@angular/forms';

@Component({
  selector: 'app-upload-fidusign-achat2step',
  templateUrl: './upload-fidusign-achat2step.component.html',
  styleUrls: ['./upload-fidusign-achat2step.component.scss'],
})
export class UploadFidusignAchat2Step implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  societeSignataireList$: Observable<string[]>;
  fournisseurList$: Observable<string[]>;
  achatNatureDuDocumentList$: Observable<string[]>;
  categorieDuContratList$: Observable<ValueLabelItem[]>;
  categorieList: FidusignCategorie[];
  sousCategorieList: ValueLabelItem[] = [];
  destroy$ = new Subject();
  destroyEnvoyerEnGed$ = new Subject();
  dateNow = new Date();

  constructor(
    private rootFormGroup: FormGroupDirective,
    public fidusign: FidusignService,
    private userService: UserService,
    private fb: UntypedFormBuilder,
  ) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control;
    this.create2StepFields();
    this.societeSignataireList$ = this.fidusign.getSocieteSignataireList();
    this.fournisseurList$ = this.fidusign.getFournisseurList();
    this.achatNatureDuDocumentList$ = this.fidusign.getAchatNatureDuDocumentList();
    this.categorieDuContratList$ = this.getCategorieDuContratList();
    this.envoyerEnGedHandler()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  private getCategorieDuContratList(): Observable<ValueLabelItem[]> {
    return this.fidusign.getCategorieList()
      .pipe(
        tap((categorieList: FidusignCategorie[]) => {
          this.categorieList = categorieList;
          this.sousCategorieList = this.convertSousCategorieList(this.categorieList);
        }),
        map(this.removeDuplicateValues),
        map(this.convertCategorieDuContratList),
      );
  }

  private create2StepFields(): void {
    this.form.addControl('step2',
      this.fb.group({
        'fiducial:domainContainerBranche': 'STAFFING',
        'fiducial:domainContainerSociete': 'DIR_ACHAT',
        'fiducial:domainContainerApplication': 'ACHAT',
        'cm:title': '',
        'cmis:name': '',
        'contrat:acheteur': ['FIDUCIAL STAFFING', Validators.required],
        'contrat:fournisseur': ['', Validators.required],
        'contrat:nature': ['', Validators.required],
        'fiducial:domainContainerFamille': ['', Validators.required],
        'fiducial:domainContainerSousFamille': ['', Validators.required],
        'contrat:clientinterne': '',
        'contrat:dateContrat': ['', Validators.required],
        'contrat:dateFinContrat': ['', Validators.required],
        'contrat:reconduction': ['Non', Validators.required],
        'cm:description': ['', [Validators.required, Validators.maxLength(100)]],
      })
    );

    this.categorieDuContratChanges();
    this.reconductionTaciteChanges();
    this.sousFamilleChanges();
  }

  private reconductionTaciteChanges(): void {
    this.getStep2GroupFieldChanges('contrat:reconduction')
      .subscribe((reconductionTacite: 'Oui' | 'Non') => {
        if (reconductionTacite === 'Oui') {
          this.step2Group.addControl('contrat:resiliation', this.fb.control('', Validators.required));
          return;
        }

        this.step2Group.removeControl('contrat:resiliation');
      });
  }

  private getStep2GroupFieldChanges(fieldName: string): Observable<any> {
    return this.form.get(['step2', fieldName]).valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )
  }

  private sousFamilleChanges(): void {
    this.getStep2GroupFieldChanges('fiducial:domainContainerSousFamille')
      .pipe(filter(() => !this.form.get(['step2', 'fiducial:domainContainerFamille']).value))
      .subscribe((name: string) => {
        const findCategorieDuContratValue = this.categorieList.find(categorie => name === categorie.name)?.libelle1;
        this.form.get(['step2', 'fiducial:domainContainerFamille']).setValue(findCategorieDuContratValue || '', { emitEvent: false });
      });
  }

  private categorieDuContratChanges(): void {
    this.getStep2GroupFieldChanges('fiducial:domainContainerFamille')
      .subscribe((newCategorie: string) => {
        this.form.get(['step2', 'fiducial:domainContainerSousFamille']).setValue('', { emitEvent: false });
        if (!newCategorie) {
          this.sousCategorieList = this.convertSousCategorieList(this.categorieList);
          return;
        }

        this.generateSousCategorieList(newCategorie);
      });
  }

  private generateSousCategorieList(libelle1: string): void {
    const filteredCategorieList = this.categorieList
      .filter(categorie => libelle1 === categorie.libelle1);

    this.sousCategorieList = this.convertSousCategorieList(filteredCategorieList);
  }

  private convertCategorieDuContratList(categorieList: FidusignCategorie[]): ValueLabelItem[] {
    return categorieList.map(categorie => {
      return {
        value: categorie.libelle1,
        label: categorie.libelle2
      }
    });
  }

  private convertSousCategorieList(categorieList: FidusignCategorie[]): ValueLabelItem[] {
    return categorieList.map(categorie => {
      return {
        value: categorie.name,
        label: categorie.libelle3 === 'Matériel' ? `${categorie.libelle3} (${categorie.libelle2})` : categorie.libelle3
      };
    });
  }

  private removeDuplicateValues(categorieList: FidusignCategorie[]): FidusignCategorie[] {
    return categorieList.filter((v, i, a) => a.findIndex(v2 => (v2.libelle2 === v.libelle2)) === i);
  }

  onKeyDown(e: KeyboardEvent): void {
    e.preventDefault();
  }
}
