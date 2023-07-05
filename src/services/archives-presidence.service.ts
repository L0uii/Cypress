import { AuthenticationService, NodesApiService } from '@alfresco/adf-core';
import {Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ArchivesMetadata, LabelValue, METADATAS} from 'models/archives-presidence';
import moment from 'moment-es6';
import {UtilsService} from './utils.service';
import {cloneDeep} from 'lodash';

export interface ArchivesPresidenceColumns {
  list: any[],
  fileName: string,
  options: ArchivesPresidenceOptions
}
export interface ArchivesPresidenceOptions {
  showTitle: boolean,
  title: string,
  headers: string[],
  nullToEmptyString: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ArchivesPresidenceService {
  aspects = 'P:fp:mr,P:fiducial:domainContainer,P:fp:contenuNonIndexeControl,P:contact:contact';
  metadatas: ArchivesMetadata[] = cloneDeep(METADATAS);
  extensions: string[] = [
    'docx',
    'DOCX',
    'odt',
    'ODT'
  ];
  columns: string[] = [
    'select',
    'Titre_AP',
    'Nature_AP',
    'Annee_AP',
    'Dossier_AP',
    'Localisation_AP',
    'Thematique_AP',
    'Remarques_AP'
  ];
  sortBy: LabelValue[] = [
    {
      label: 'Date de création',
      value: 'created'
    },
    {
      label: 'Thématique',
      value: 'fiducial:domainContainerFamille'
    },
    {
      label: 'Localisation',
      value: 'fiducial:domainContainerApplication'
    }
  ];
  order: LabelValue[] = [
    {
      label: 'Décroissant',
      value: false
    },
    {
      label: 'Croissant',
      value: true
    }
  ];
  onglets: Home.Tabs = {
    CONSULTATION: {
      name: 'Archives',
      fetchFn: 'getArchivesPresidence',
      columns: this.columns
    }
  };

  constructor(
    private utils: UtilsService,
    private nodesApi: NodesApiService,
    private auth: AuthenticationService
  ) {
  }


  formatCSVColumns(data: any[]): ArchivesPresidenceColumns {
    const metadata = Object.keys(data[0])
      .map(el => this.metadatas.filter(item => el.toLowerCase() === item.name.toLowerCase()))
      .reduce((acc, val) => acc.concat(val), [])
      .sort((a, b) => a.order - b.order);
    const columnsName = metadata.map(el => el.label);
    const list = data.map((obj) => {
      const object = {};
      metadata.map(column => {
        if (column.name) {
          const value = `${column.name[0].toUpperCase()}${column.name.slice(1)}`;
          return object[value] = !obj[value] ? '' :
            column.type === 'date' || column.type === 'dateRange' ? moment(obj[value]).format('DD/MM/YYYY') :
              column.type === 'year' ? moment(obj[value]).format('YYYY') :
                typeof obj[value] === 'string' ? obj[value].replace(/_/g, ' ') :
                  obj[value];
        }
      });
      return object;
    });

    const fileName = `archives-presidence-${moment().format('DD-MM-YYYY_HH-mm-ss')}`;
    const options = {
      showTitle: true,
      title: `Recherche du ${this.utils.getDateNow()}`,
      headers: columnsName,
      nullToEmptyString: true
    };

    return {list, fileName, options};
  }

  getExtensions(): string[] {
    return this.extensions;
  }

  getAspects(): string {
    return this.aspects;
  }

  required(formControl: UntypedFormControl): void {
    formControl.setValidators([Validators.required]);
    formControl.updateValueAndValidity();
  }

  notRequired(formControl: UntypedFormControl): void {
    formControl.setValidators(null);
    formControl.updateValueAndValidity();
  }

  toggleInputVisibility(value: any, inputs: Object, form: UntypedFormGroup, regex: RegExp, name: string): void {
    if (value) {
      if (regex.test(value)) {
        inputs[name].obligatoire = true;
        inputs[name].show = true;
        this.required(form.controls[name] as UntypedFormControl);
      }
    } else {
      inputs[name].obligatoire = false;
      inputs[name].show = false;
      inputs[name].value = undefined;
      form.controls[name].setValue(null);
      this.notRequired(form.controls[name] as UntypedFormControl);
    }
  }

  onChangeState(value: any, inputs: Object, form: UntypedFormGroup): void {
    // si état du dossier = transmis; champ destinataire = obligatoire
    const reg = /transmis/gi;
    this.toggleInputVisibility(value, inputs, form, reg, 'destinataire');
  }

  onChangeLocalisation(value: any, inputs: Object, form: UntypedFormGroup): void {
    // si localisation = lyon; niveau de localisation = obligatoire
    const reg = /lyon/gi;
    this.toggleInputVisibility(value, inputs, form, reg, 'local');
  }

  onChangeLocal(value: any, inputs: Object, form: UntypedFormGroup): void {
    // si local = valeurs 'obligatoires' -> complément localisation obligatoires
    const reg = /Salle du coffre|Salle de travail|Couloir|Cybele|Calliope|Artermis|Danae|Bibliotheque|Grandes archives/gi;
    // si local = grandes archives -> local = saisie libre
    this.toggleInputVisibility(value, inputs, form, reg, 'complementLocalisation');
    if (value) {
      inputs['complementLocalisation']['label'] = 'Rayonnage';
      inputs['complementLocalisation']['saisieLibre'] = true;
    }
    inputs['complementLocalisation']['label'] = 'Carton ou rayonnage';
    inputs['complementLocalisation']['saisieLibre'] = false;
  }

  createDocumentProperties(form: any, update?: boolean): string {
    const documentProperties = JSON.stringify({
      'cmis:name': update ? null : form.file ?
        this.utils.removeSpecialCharacters(form.file.name) :
        this.utils.removeSpecialCharacters(form.titre).toUpperCase().trim(),
      'cm:author': update ? null : this.auth.getEcmUsername(),
      'cm:title': form.titre ? form.titre.toUpperCase().trim() : null,
      'cm:isContentIndexed': true,
      'fiducial:domainContainerBranche': 'PRESIDENCE',
      'fiducial:domainContainerSociete': 'ARCHIVES',
      'fiducial:domainContainerApplication': form.localisation ? form.localisation : null,
      'fiducial:domainContainerFamille': form.thematique ? form.thematique : null,
      'fiducial:domainContainerSousFamille': form.sommaire ? form.sommaire : null,
      'fp:nature': form.nature ? form.nature : null,
      'fp:dateDebutPeriode': form.anneeDebut ? moment(form.anneeDebut).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:dateFinPeriode': form.anneeFin ? moment(form.anneeFin).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:statut': form.etatDossier ? form.etatDossier : null,
      'fp:dateTraitement': form.dateTraitement ? moment(form.dateTraitement).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:destinataire': form.destinataire ? form.destinataire.toUpperCase() : null,
      'fp:local': form.local ? form.local.toUpperCase() : null,
      'contact:complement': form.complementLocalisation ? form.complementLocalisation.toUpperCase() : null,
      'fp:natureObjet': form.keywords ? form.keywords : null,
      'cm:description': form.description ? this.utils.removeSpecialCharacters(form.description) : null,
    });
    return documentProperties;
  }

  async getDocumentProperties(nodeId: string): Promise<{}> {
    return this.nodesApi.getNode(nodeId).toPromise().then(resp => {
      const document = {id: nodeId, name: resp.name};
      const documentProperties = this.metadatas.reduce((o, key) => {
        let value = resp.properties[key.metadata] || undefined;
        if (value) {
          if (key.type === 'year') {
            key['typedDate'] = moment(value).format('YYYY');
          }
          if (key.type === 'optionsArray' || key.type === 'optionsObject') {
            key['typedValue'] = value.replace(/_/g, ' ');
          }
          if (key.type === 'tags') {
            value = value.split(' ');
          }
          if (key.name === 'sommaire') {
            key.show = false;
          }
        }
        return Object.assign(o, {[key.name]: {...key, value, actif: false}});
      }, {});
      return {documentProperties, document};
    });
  }
}
