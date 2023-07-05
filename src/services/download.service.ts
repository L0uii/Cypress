import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import * as moment from 'moment';
import {AngularCsv} from 'angular-csv-ext/dist/Angular-csv';
import {SnackbarService} from './snackbar.service';
import {UtilsService} from './utils.service';
import {Router} from '@angular/router';
import {CategorieGeranceAssociesPipe} from 'pipes/categorie-gerance-associes.pipe';
import {CLASSEMENT} from 'models/mr';
import {ArchivesPresidenceService} from './archives-presidence.service';
import {ConseilService} from './conseil.service';
import {ExpertiseService} from './expertise.service';
import {GeranceAssociesService} from './gerance-associes.service';
import {FilePropertiesExpertise} from '../models/file-properties-expertise';
import { ContentService } from '@alfresco/adf-core';
import { MissingDocuments, MissingDocumentsByEmployee } from './missing-documents-mr.service';

@Injectable({
  providedIn: 'root'
})

export class DownloadService {
  espaces = {
    'gerance-associes': this.geranceAssociesService,
    'conseil': this.conseilService,
    'expertise': this.expertiseService,
    'archives-presidence': this.archivesPresidenceService
  };

  constructor(
    private contentService: ContentService,
    private snack: SnackbarService,
    private utils: UtilsService,
    private router: Router,
    private geranceAssociesService: GeranceAssociesService,
    private conseilService: ConseilService,
    private expertiseService: ExpertiseService,
    private archivesPresidenceService: ArchivesPresidenceService
  ) {
  }

  nameFacture(file: any): string {
    const fileExtension = file.name.split('.').pop();
    const fileName = file.Nommage && file.CodeClient ? `${file.CodeClient}-${file.Nommage.replace(/[\/]/g, '-')}` : 'document';
    return fileName + '.' + fileExtension;
  }

  nameZipFacture(files: any[]): string {
    const now = moment().format('DD-MM-YYYY_HH-mm-ss');
    const sameCodeClient = files.map(file => file.CodeClient).every((val, i, arr) => val === arr[0]);
    return sameCodeClient ? `${files[0].CodeClient}_documents_${now}.zip` : `documents_${now}.zip`;
  }

  nameZipMRtoCSV(files: any[]): string {
    const now = moment().format('DD-MM-YYYY');
    return `Dossier_${files[0].CodeClient}-Documents_${now}.zip`;
  }

  async download(file: FilePropertiesExpertise, isFacture: boolean): Promise<any> {
    const url = this.contentService.getContentUrl(file.id, true);
    const downloadName = isFacture ?
      this.nameFacture(file) : this.router.url.includes('conseil') ?
        this.utils.formatNommageConseil(file) :
        this.utils.formatNommage(file);
    await fetch(url)
      .then(function (response) {
        return response.blob();
      })
      .then(function (pdf) {
        const objectURL = window.URL.createObjectURL(pdf);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = objectURL;
        link.setAttribute('download', downloadName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  // Télécharger une archive des fichiers sélectionnés
  downloadZIP(files: any[], user: string): void {
    if (files.length > 0) {
      const zip = new JSZip();
      const urls = [];
      let count = 0;
      files.forEach((file, index) => {
        const url = this.contentService.getContentUrl(file.id, true);
        const downloadName =
          user === 'conseil' ? `${index + 1} - ${this.utils.formatNommageConseil(file)}` :
            `${index + 1} - ${this.utils.formatNommage(file)}`;
        urls.push(url);
        JSZipUtils.getBinaryContent(url, (err, data) => {
          if (err) {
            throw new Error(err);
          }
          if (user === 'mrCSV') {
            const dossier = CLASSEMENT
              .filter(el => this.utils.removeAccents(el.sousFamille).toLowerCase()
                .indexOf(this.utils.removeAccents(file.SousFamille).toLowerCase()) !== -1);
            zip.folder(dossier.length ? dossier[0].onglet.replace('\/', '-') : 'Autres').file(downloadName, data, {binary: true});
          } else {
            zip.file(downloadName, data, {binary: true});
          }
          count++;

          if (count === urls.length) {
            const now = moment().format('DD-MM-YYYY_HH-mm-ss');
            const zipFilename =
              user === 'adv' ? this.nameZipFacture(files) :
                user === 'mrCSV' ? this.nameZipMRtoCSV(files) :
                  `documents_${now}.zip`;
            zip.generateAsync({type: 'blob'}, metadata => {
              const percentage = metadata.percent.toFixed();
              this.utils.showProgress(percentage);
            }).then(content => {
              saveAs(content, zipFilename);
            });
          }
        });
      });
    } else {
      this.snack.openInfo('Veuillez sélectionner un document.');
    }
  }

  getCSV(data: any[]): AngularCsv {
    const currentEspace = this.router.url.split('/')[1];
    if (Object.keys(this.espaces).includes(currentEspace)) {
      if (data.length > 0) {
        const params = this.espaces[currentEspace]['formatCSVColumns'](data);
        return new AngularCsv(params.list, params.fileName, params.options);
      } else {
        this.snack.openInfo('Aucun document sélectionné');
      }
    }
  }

  downloadCSV(data: any[]): AngularCsv {
    if (data.length > 0) {
      const list = data.map(obj => {
        return {
          Date: moment(obj.Date).format('DD/MM/YYYY HH:mm'),
          NumeroDossier: obj.NumeroDossier === undefined ? '' : obj.NumeroDossier,
          DomaineActivite: obj.DomaineActivite === undefined ? '' : obj.DomaineActivite,
          Metier: obj.Metier === undefined ? '' : obj.Metier,
          NiveauExpertise: obj.NiveauExpertise === undefined ? '' : obj.NiveauExpertise,
          NomDocument: obj.name

        };
      });
      const columsName = Object.keys(list[0]);
      for (let i = 0; i < columsName.length; i++) {
        columsName[i] = this.utils.decamelize(columsName[i], ' ');
        columsName[i] = columsName[i].charAt(0).toUpperCase() + columsName[i].slice(1);
      }
      const now = moment().format('DD-MM-YYYY_HH-mm-ss');
      const fileName = 'recherche-' + now;
      const options = {
        title: 'Recherche du ' + now,
        headers: columsName,
        nullToEmptyString: true
      };
      return new AngularCsv(list, fileName, options);
    } else {
      this.snack.openInfo('Veuillez sélectionner un document.');
    }
  }

  downloadCSVForMR(data: FilePropertiesExpertise[], dossier?: string, nomClient?: string): AngularCsv {
    let codeClient = [];
    if (data.length > 0) {
      const list = data.map(obj => {
        codeClient.push(obj.CodeClient);
        const documentType = CLASSEMENT
          .filter(el =>
            this.utils.removeAccents(el.sousFamille).toLowerCase().indexOf(this.utils.removeAccents(obj.SousFamille).toLowerCase()) !== -1);
        // TODO get metadatas here
        return {
          Onglet: documentType[0] ? documentType[0].onglet : '',
          Société: obj.Societe,
          Application: obj.Application,
          Famille: documentType[0] ? documentType[0].labelFamille : obj.Famille,
          SousFamille: documentType[0] ? documentType[0].labelSousFamille : obj.SousFamille,
          VisibleClient: !documentType[0] ? '' : documentType[0].displayClient ? 'Oui' : 'Non',
          EnvoyéEcoffre: obj.Ecoffre ? 'Oui' : 'Non',
          Matricule: obj.Matricule === undefined ? '' : obj.Matricule,
          CodeBudget: obj.CodeBudget === undefined ? '' : obj.CodeBudget,
          NuméroDossier: obj.CodeClient === undefined ? '' : obj.CodeClient,
          DateCréation: obj.DateCreation === undefined ? '' : moment(obj.DateCreation).format('DD/MM/YYYY HH:mm'),
          // DateFinExercice
          // DateDebutExercice
          DateDocument: obj.DateDocument === undefined ? '' : moment(obj.DateDocument).format('DD/MM/YYYY'),
          NatureObjet: obj.NatureObjet === undefined ? '' : obj.NatureObjet,
          Statut: obj.Statut === undefined ? '' : obj.Statut,
          NomDuDocument: obj.Nommage === undefined ? '' : obj.Nommage,
          NomDuFichier: obj.name === undefined ? '' : obj.name,
          id: obj.id === undefined ? '' : obj.id
        };
      });
      codeClient = codeClient.every(v => v === codeClient[0] || v === undefined) ? codeClient[0] : undefined;
      const columsName = Object.keys(list[0]);
      for (let i = 0; i < columsName.length; i++) {
        columsName[i] = this.utils.decamelize(columsName[i], ' ');
        columsName[i] = columsName[i].charAt(0).toUpperCase() + columsName[i].slice(1);
      }
      const fileName = codeClient ? `documents_dossier_${codeClient}`
        : dossier ? `documents_${dossier.toLowerCase()}` : `documents_expertise_consulting`;
      const title = codeClient && !nomClient ? `Documents dossier n°${codeClient} - ` :
        codeClient && nomClient ? `Documents dossier n°${codeClient} : ${nomClient} - ` :
          dossier ? `Documents - ${dossier} - ` : '';
      const options = {
        showTitle: true,
        title: `${title}Recherche du ${this.utils.getDateNow()}`,
        headers: columsName,
        nullToEmptyString: true
      };
      return new AngularCsv(list, fileName, options);
    } else {
      this.snack.openInfo('Aucun document pour ce client');
    }
  }

  downloadCSVForGeranceAssocies(file: any): AngularCsv {
    if (file.length > 0) {
      const list = file.map(obj => {
        return {
          NomAssocie: obj.NomAssocie === undefined ? '' : obj.NomAssocie,
          NumeroAssocie: obj.NumeroAssocie === undefined ? '' : obj.NumeroAssocie,
          CodeManager: obj.CodeManager === undefined ? '' : obj.CodeManager,
          NomManager: obj.NomManager === undefined ? '' : obj.NomManager,
          CodeAgent: obj.CodeAgent === undefined ? '' : obj.CodeAgent,
          NomAgent: obj.NomAgent === undefined ? '' : obj.NomAgent,
          TypeDocumentGerance: obj.TypeDocumentGerance === undefined ? '' :
            new CategorieGeranceAssociesPipe().transform(obj.TypeDocumentGerance),
          DateValidite: obj.DateValidite === undefined ? '' : moment(obj.DateValidite).format('DD/MM/YYYY'),
          DateDocument: obj.DateDocument === undefined ? '' : moment(obj.DateDocument).format('DD/MM/YYYY'),
          NommageGerance: obj.NommageGerance === undefined ? '' : obj.NommageGerance,
          name: obj.name === undefined ? '' : obj.name,
          id: obj.id === undefined ? '' : obj.id
        };
      });
      const columsName = Object.keys(list[0]);
      for (let i = 0; i < columsName.length; i++) {
        columsName[i] = this.utils.decamelize(columsName[i], ' ');
        columsName[i] = columsName[i].charAt(0).toUpperCase() + columsName[i].slice(1);
      }
      const now = moment().format('DD-MM-YYYY_HH-mm-ss');
      const fileName = `documents_gerance_${now}`;
      const options = {
        showTitle: true,
        title: `Recherche du ${this.utils.getDateNow()}`,
        headers: columsName,
        nullToEmptyString: true
      };
      return new AngularCsv(list, fileName, options);
    } else {
      this.snack.openInfo('Aucun document sélectionné');
    }
  }

  downloadCSVForMissingDocuments(
    documents: MissingDocuments[],
    numDossier: string,
    typeProfil: string,
    typeDocumentsLabel: string,
    typeDocumentsCode: string,
    isMissing: boolean = true
  ): AngularCsv {
    const orderedDocs = documents
      .filter(d => isMissing ? d.isMissing : !d.isMissing)
      .map(d => {
        const { onglet, classement, nomDocument } = d;
        return {
          onglet,
          classement,
          nomDocument
        };
      });

    const columsName = Object.keys(orderedDocs[0]).map(c => {
      const columnName = this.utils.decamelize(c, ' ');
      return `${columnName.charAt(0).toUpperCase()}${columnName.slice(1)}`;
    });
    const typeOfList = isMissing ? 'Absents' : 'Presents';
    const now = moment().format('DD-MM-YYYY_HH-mm-ss');
    const fileName = `Documents${typeOfList}_${typeDocumentsCode}_${now}`;
    const options = {
      showTitle: true,
      title: `Documents ${typeOfList} Dossier n° ${numDossier} - Type de profil : ${typeProfil} - Types de documents : ${typeDocumentsLabel}`,
      headers: columsName,
      nullToEmptyString: true
    };
    return new AngularCsv(orderedDocs, fileName, options);
  }

  downloadCSVForMissingDocumentsSocial(
    missCompanyDocs: MissingDocuments[],
    numDossier: string,
    missDocByEmployee: MissingDocumentsByEmployee[],
    isMissing: boolean = true
  ): AngularCsv {
    const companyDocs = missCompanyDocs
      .filter(d => isMissing ? d.isMissing : !d.isMissing)
      .map(d => {
        const { onglet, classement, nomDocument } = d;

        return {
          onglet,
          classement,
          nomDocument,
          listeCollaborateur: ''
        };
      });

    if (companyDocs.length === 0) {
      companyDocs.push({
        classement: '-',
        onglet: '-',
        nomDocument: '-',
        listeCollaborateur: ''
      })
    }

    const docByEmployeeList = missDocByEmployee[0].documents
      .map(d => {
        const { onglet, classement, nomDocument } = d;

        const listeCollaborateur = missDocByEmployee
          .reduce((acc, cur) => {
            const docMissing = cur.documents.find(c => c.nomDocument === nomDocument).isMissing;
            if (isMissing ? docMissing : !docMissing) {
              acc.push(cur.name)
            }
            return acc;
          }, []);

        if (listeCollaborateur.length) {
          return {
            onglet,
            classement,
            nomDocument,
            listeCollaborateur: listeCollaborateur.join(' ,')
          }
        }
      });

    const docList = [
      ...companyDocs,
      { onglet:'', classement: '', nomDocument: '', listeCollaborateur: '' },
      ...docByEmployeeList
    ];
    const columsName = [
      'Onglet',
      'Classement',
      'Nom du Document',
      'Liste Collaborateur(s)'
    ];
    const typeOfList = isMissing ? 'Absents' : 'Presents';
    const now = moment().format('DD-MM-YYYY_HH-mm-ss');
    const fileName = `Documents${typeOfList}_Social_${now}`;
    const options = {
      showTitle: true,
      title: `Documents ${typeOfList} Dossier n° ${numDossier} - Type de profil : Social`,
      headers: columsName,
      nullToEmptyString: true
    };
    return new AngularCsv(docList, fileName, options);
  }
}
