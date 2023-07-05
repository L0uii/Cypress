import { endpoints } from './../../../endpoints/endpoints';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '@alfresco/adf-core';
import {GeranceAssociesService} from 'services/gerance-associes.service';
import {ConseilService} from 'services/conseil.service';
import {UtilsService} from 'services/utils.service';
import {Router} from '@angular/router';
import {ExpertiseService} from 'services/expertise.service';
import {ArchivesPresidenceService} from 'services/archives-presidence.service';
import * as Sentry from "@sentry/angular-ivy";

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {
  espaces = {
    'gerance-associes': this.serviceGerance,
    'conseil': this.serviceConseil,
    'expertise': this.serviceExpertise,
    'archives-presidence': this.serviceArchivesPresidence

  };
  aspects = undefined;

  // Tentative de création
  failList = [];
  successList = [];

  createPending = false;
  createSuccess = false;
  createFailed = false;

  // Relance si échec création
  retryList = [];
  failListRetry = [];
  successListRetry = [];

  retryPending = false;
  retryFailed = false;
  retrySuccess = false;

  @Input() data: any;
  @Output() filesSended = new EventEmitter();

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private utils: UtilsService,
    private serviceGerance: GeranceAssociesService,
    private serviceConseil: ConseilService,
    private serviceExpertise: ExpertiseService,
    private serviceArchivesPresidence: ArchivesPresidenceService
  ) {
  }

  async send() {
    this.createPending = true;
    const espaces = [];
    for (const key in this.espaces) {
      if (this.espaces) {
        espaces.push(key);
      }
    }
    if (this.router.url.includes('archives-presidence')) {
      const file = this.data.form.file;
      this.aspects = this.espaces['archives-presidence']['getAspects']();
      const documentProperties = this.espaces['archives-presidence']['createDocumentProperties'](this.data.form);
      const create = file && file.size ?
        this.createWithContent(file, this.aspects, documentProperties) : this.createWithoutContent(this.aspects, documentProperties);
      create.then(resp => resp.text()).then(response => {
        if (response.split(';').pop() === '1.0') {
          this.successList.push(file ? file.name : this.data.form.title);
          Sentry.captureMessage(`document created: ${file.name}`, 'log');
        } else {
          const resp = JSON.parse(response);
          const error = this.utils.isJSON(resp.message) ? JSON.parse(resp.message).label : resp.message;
          this.failList.push({name: file ? file.name : this.data.form.title, error: error});
          this.retryList.push({properties: documentProperties});
        }
        if (this.failList.length > 0) {
          this.createPending = false;
          this.createFailed = true;
        } else {
          this.createPending = false;
          this.createSuccess = true;
        }
      });
    } else {
      for (const currentEspace of espaces) {
        if (this.router.url.includes(currentEspace)) {
          this.aspects = this.espaces[currentEspace]['getAspects']();
          for (let index = 0; index < this.data.fileList.length; index++) {
            const file = this.data.fileList[index];
            const renamedFile = new File([file], this.utils.formatFilename(file.name), {type: file.type});
            const form = this.data.form[index];
            const documentProperties = this.espaces[currentEspace]['generateDocumentProperties'](form, renamedFile.name);
            await this.createWithContent(renamedFile, this.aspects, documentProperties).then(resp => resp.text()).then(response => {
              if (response.split(';').pop() === '1.0') {
                this.successList.push(renamedFile.name);
                Sentry.captureMessage(`document created: ${renamedFile.name}`, 'log');
              } else {
                const resp = JSON.parse(response);
                const error = this.utils.isJSON(resp.message) ? JSON.parse(resp.message).label : resp.message;
                this.failList.push({name: renamedFile.name, error: error});
                this.retryList.push({file: renamedFile, properties: documentProperties});
              }
              if (index === this.data.fileList.length - 1) {
                if (this.failList.length > 0) {
                  this.createPending = false;
                  this.createFailed = true;
                } else {
                  this.createPending = false;
                  this.createSuccess = true;
                }
              }
            });
          }
        }
      }
    }
  }

  async createWithContent(file, aspects, documentProperties: string): Promise<Response> {
    return await fetch(endpoints.frontGEDCreateDocument, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': this.utils.getContentType(file.name),
        ticket: this.utils.getHeaderTicket(),
        docType: 'D:fp:document',
        aspects: aspects,
        'Document-Properties': documentProperties,
      }),
      body: file
    });
  }

  async createWithoutContent(aspects, documentProperties): Promise<Response> {
    return await fetch(endpoints.frontGEDCreateDocumentWithoutContent, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/octet-stream',
        ticket: this.utils.getHeaderTicket(),
        docType: 'D:fp:document',
        aspects: aspects,
        'Document-Properties': documentProperties,
      })
    });
  }

  async retry(retryList) {
    this.retryPending = true;
    this.failListRetry = [];
    this.successListRetry = [];
    for (let index = 0; index < retryList.length; index++) {
      await this.createWithContent(retryList[index].file,  this.aspects, retryList[index].properties).then(resp => resp.text()).then(response => {
        if (response.split(';').pop() === '1.0') {
          this.successListRetry.push(retryList[index].file.name);
          Sentry.captureMessage(`document created: ${retryList[index].file.name}`, 'log');
        } else {
          const resp = JSON.parse(response);
          const error = this.utils.isJSON(resp.message) ? JSON.parse(resp.message).label : resp.message;
          this.failListRetry.push({name: retryList[index].file.name, error: error});
        }
        if (index === retryList.length - 1) {
          if (this.failListRetry.length > 0) {
            this.retryPending = false;
            this.retryFailed = true;
          } else if (this.failListRetry.length === 0) {
            this.retryPending = false;
            this.retrySuccess = true;
          }
        }
      });
    }
  }

  close() {
    this.successList = [];
    this.failList = [];
    this.failListRetry = [];
    this.successListRetry = [];
    this.filesSended.emit();
  }

  ngOnInit() {
    this.send();
  }
}
