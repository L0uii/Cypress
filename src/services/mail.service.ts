import { ContentService } from '@alfresco/adf-core';
import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import * as moment from 'moment';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import {SnackbarService} from './snackbar.service';
import {TypeDocumentConseilPipe} from 'pipes/type-document-conseil.pipe';
import {DownloadService} from './download.service';
import {UtilsService} from './utils.service';
import {HttpClient} from '@angular/common/http';
import {FilePropertiesGeranceAssocies} from '../models/file-properties-gerance-associes';
import {FilePropertiesExpertise} from '../models/file-properties-expertise';
import {FilesPropertiesSofiral} from '../models/files-properties-sofiral';
import { MissingDocuments } from './missing-documents-mr.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  constructor(
    private contentService: ContentService,
    private snack: SnackbarService,
    private download: DownloadService,
    private http: HttpClient,
    private utils: UtilsService
  ) {
  }

  async send(files: Array<any>, space: string): Promise<any> {
    if (space === 'expertise' && files.some(el => el.SousFamille === 'Bulletin')) {
      this.snack.openWarn('Les documents de type "Bulletin" ne peuvent pas être envoyés par mail');
      return '';
    }

    if (!files.length) {
      this.snack.openInfo('Veuillez sélectionner un document.');
      return '';
    }

    const urlRequestShare = environment.fidushareAPI + environment.fidushareUser;
    const uploadLink = await fetch(urlRequestShare)
      .then(response => response.text())
      .then(data => {
        return data + '&js=true';
      });
    const zip = new JSZip();
    const urls = [];
    const zipFilename = `documents_${space}_${moment().format('DD-MM-YYYY_HH-mm-ss')}.zip`;

    await Promise.all(
      files.map(async file => {
        const url = this.contentService.getContentUrl(file.id, true);
        const downloadName = this.utils.formatNommage(file);
        urls.push(url);
        return new Promise((resolve, reject) => {
          JSZipUtils.getBinaryContent(url, (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(zip.file(downloadName, data, { binary: true }));
          });
        })
      })
    );

    return zip
      .generateAsync({
        compression: 'DEFLATE',
        type: 'blob'
      })
      .then(async content => {
        const fileObj = new File([content], zipFilename);
        const formData = new FormData();
        formData.append('nom', environment.fidushareUser);
        formData.append('email', environment.fidushareUser);
        formData.append('description', 'Documents GED');
        formData.append('file', fileObj);
        return fetch(uploadLink, {
          method: 'POST',
          body: formData
        })
      })
      .then(response => response.text())
      .then(resp => {
        const downloadUrl = resp.match(/https:([^"]*)/g).toString();
        switch (space) {
          case 'adv':
            this.emailBodyADV(files, downloadUrl);
            break;
          case 'conseil':
            this.emailBodyConseil(files, downloadUrl);
            break;
          case 'expertise':
          case 'gerance_associes':
          case 'sofiral':
            this.emailBodyExpertiseAndSofiralAndGerance(files, downloadUrl, space);
            break;
        }

        return downloadUrl;
      });
  }

  emailBodyExpertiseAndSofiralAndGerance(files: Array<FilePropertiesGeranceAssocies | FilePropertiesExpertise | FilesPropertiesSofiral>, downloadUrl: string, space: string): void {
    const numDossier = space === 'gerance_associes' ? 'NumeroAssocie' : 'CodeClient';
    const nommage = space === 'gerance_associes' ? 'NommageGerance' : 'Nommage';
    const numero = space === 'gerance_associes' ? 'NumeroAssocie' : 'CodeClient';
    const manyFiles = files.length > 1;
    const subject = manyFiles ?
      `Documents client (${files.length} pièces)` :
      `Document client (${files.length} pièce) - ${files[0][numero]}`;
    let body = 'Bonjour, \r\n\r\nVeuillez trouver ci-joint le lien de téléchargement ';
    manyFiles ? body += 'de vos documents: \r\n\r\n' : body += 'de votre document: \r\n\r\n';
    body += downloadUrl + '\r\n\r\n';
    manyFiles ? body += `Cette archive comprend ${files.length} fichiers : \r\n\r\n` : body += '';
    manyFiles ?
      files.forEach((file) => {
        body += `\r● Numéro dossier : ${file[numDossier]}  \r\n\r\n  Nom du document : ${file[nommage] ? file[nommage] : file.name} \r\n\r\n`;
      }) :
      body += `\r● Numéro dossier : ${files[0][numDossier]} \r\n\r\n  Nom du document : ${files[0][nommage] ? files[0][nommage] : files[0].name} \r\n\r\n `;
    body += 'En vous souhaitant bonne réception, \r\n\r\n';
    let uri = 'mailto:?subject=';
    uri += encodeURIComponent(subject);
    uri += '&body=';
    uri += encodeURIComponent(body);
    window.location.href = 'mailto:' + uri;
  }

  emailBodyConseil(files: any[], downloadUrl: string): void {
    const manyFiles = files.length > 1;
    const subject = manyFiles ?
      `Documents client (${files.length} pièces)` :
      `Document client (${files.length} pièce) - ${files[0].Acheteur}`;
    let body = 'Bonjour, \r\n\r\nVeuillez trouver ci-joint le lien de téléchargement ';
    manyFiles ? body += 'des documents: \r\n\r\n' : body += 'du document: \r\n\r\n';
    body += downloadUrl + '\r\n\r\n';
    manyFiles ?
      files.forEach(file => body += `\r${file.Acheteur} - ${new TypeDocumentConseilPipe().transform(file.TypeDocument)} \r\n\r\n`) :
      body += `\r${files[0].Acheteur} - ${new TypeDocumentConseilPipe().transform(files[0].TypeDocument)} \r\n\r\n `;
    body += 'En vous souhaitant bonne réception, \r\n\r\n';
    let uri = 'mailto:?subject=';
    uri += encodeURIComponent(subject);
    uri += '&body=';
    uri += encodeURIComponent(body);
    window.location.href = 'mailto:' + uri;
  }

  emailBodyADV(files: any[], downloadUrl: string): void {
    const manyFiles = files.length > 1;
    let subject;
    if (manyFiles) {
      subject = 'Numéro client : ' + files[0].CodeClient + '... (' + files.length + ' fichiers)';
    } else if (files[0].NomClient !== undefined && !manyFiles) {
      subject = 'Numéro client : ' + files[0].CodeClient + ' - Nom Client : ' + files[0].NomClient + ' - Document : ' + files[0].Nommage;
    } else {
      subject = 'Numéro client : ' + files[0].CodeClient + ' - Document : ' + files[0].Nommage;
    }
    let body = 'Bonjour, \r\n\r\nVeuillez trouver ci-joint le lien de téléchargement ';
    manyFiles ? body += 'des documents: \r\n\r\n' : body += 'du document: \r\n\r\n';
    body += downloadUrl + '\r\n\r\n';
    if (manyFiles) {
      files.forEach(function (file) {
        const codeClient = file.CodeClient;
        const nomClient = file.NomClient;
        const fileName = file.Nommage;
        body += 'Numéro Client: ' + codeClient;
        if (nomClient) {
          body += ',\r\nNom Client: ' + nomClient;
        }
        body += ',\r\nFichier: ' + fileName + '.\r\n\r\n';
      });
    } else {
      body += 'Numéro Client: ' + files[0].CodeClient;
      if (files[0].NomClient !== undefined) {
        body += ',\r\nNom Client: ' + files[0].NomClient;
      }
      body += ',\r\nFichier: ' + files[0].Nommage + '.\r\n\r\n';
    }
    body += 'En vous souhaitant bonne réception, \r\n\r\n';
    let uri = 'mailto:?subject=';
    uri += encodeURIComponent(subject);
    uri += '&body=';
    uri += encodeURIComponent(body);
    window.location.href = 'mailto:' + uri;
  }

  sendEmailMissingDocuments(
    emailAddress: string,
    numClient: string,
    list: MissingDocuments[],
    profileType: string,
    documentType: string
  ): void {
    const subject = `Demande de document(s) - ${numClient} - ${profileType} - ${documentType}`;

    let body = ''.concat(
      'Bonjour,',
      '\n\n',
      'Nous vous remercions de bien vouloir nous faire parvenir les documents listés ci-dessous soit en les déposant sur le portail Fiducial Mon Expert-Comptable, soit par retour de mail :',
      '\n\n',
      ...list.map(
        (l) => `${l.nomDocument}\n`
      ),
      '\n'
    );

    const mailto = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (mailto.length < 2048) {
      document.location.href = mailto;
      return;
    }

    this.snack.openInfo(`La liste des documents absents est trop longue pour être reprise en automatique dans le contenu du mail. Merci de vérifier / compléter la liste en fonction des informations présentes dans l'écran de contrôle ou via l'option de téléchargement du fichier csv`)
  }

  sendEmailMissingDocumentsSocial(
    emailAddress: string,
    numClient: string,
    list: MissingDocuments[]
  ): void {
    const subject = `Demande de document(s) - ${numClient} - Social`;

    let body = ''.concat(
      'Bonjour,',
      '\n\n',
      'Nous vous remercions de bien vouloir nous faire parvenir les documents listés ci-dessous soit en les déposant sur le portail Fiducial Mon Expert-Comptable, soit par retour de mail :',
      '\n\n',
      ...list.map(
        (l) => `${l.nomDocument}\n`
      ),
      '\n'
    );

    const mailto = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.location.href = mailto;
  }

  sendClientResponseEmail(emailAddress: string, message: string): void {
    const subject = `Réception de documents`;

    const body = ''.concat(
      'Bonjour,',
      '\n\n',
      'Nous avons bien réceptionné votre envoi de document(s) avec le message suivant :',
      '\n\n',
      message,
      '\n\n',
    );
    const mailto = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.location.href = mailto;
  }
}
