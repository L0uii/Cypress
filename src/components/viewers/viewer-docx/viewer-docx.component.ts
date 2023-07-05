import { NodesApiService, ContentService } from '@alfresco/adf-core';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdateResultsService} from 'services/update-results.service';
import * as mammoth from 'mammoth/mammoth.browser.js';
import * as JSZipUtils from 'jszip-utils';
import * as moment from 'moment';
import {ExpLevelPipe} from 'pipes/exp-level.pipe';


@Component({
  selector: 'app-viewer-docx',
  templateUrl: './viewer-docx.component.html',
  styleUrls: ['./viewer-docx.component.scss'],
  providers: [ExpLevelPipe]
})
export class ViewerDocxComponent implements OnInit {
  nodeId: string;
  url: string;
  properties = [];
  sideNavOpen = false;

  constructor(private route: ActivatedRoute,
              private contentService: ContentService,
              private router: Router,
              private updateService: UpdateResultsService,
              private expPipe: ExpLevelPipe,
              private nodesApi: NodesApiService) {
    this.updateService.mustRefreshChange.subscribe(change => {
      if (change) {
        this.loadProperties(this.nodeId);
      }
    });
  }

  convertDocxToHtml(keywords: string) {
    JSZipUtils.getBinaryContent(this.url, (err, data) => {
        mammoth.convertToHtml({arrayBuffer: data}).then(function (result) {
          if (keywords !== undefined) {
            const arrayKeywords = keywords.split(' ');
            const re = new RegExp(arrayKeywords.join('|'), 'gi');
            document.getElementById('docxInnerText').innerHTML = result.value.replace(re, `<span class="highlight__docx">$&</span>`);
          } else {
            document.getElementById('docxInnerText').innerHTML = result.value;
          }
        });
    });
  }

  close() {
    this.router.navigate([{outlets: {view: null}}]);
  }

  toggleNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  async download() {
    await fetch(this.url)
      .then(function (response) {
        return response.blob();
      })
      .then(function (docx) {
        const objectURL = window.URL.createObjectURL(docx);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = objectURL;
        link.setAttribute('download', 'cv.docx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  updateCV() {
    this.router.navigate([{outlets: {view: ['update-cv', this.nodeId]}}]);
  }

  loadProperties(id: string) {
    this.nodesApi.getNode(id).toPromise().then(resp => {
      const properties = resp.properties;
      this.properties.push({name: 'Nom du document', value: resp.name});
      this.properties.push({
        name: 'Date de création',
        value: moment(properties['fiducial:documentTrackableContentDate']).format('DD/MM/YYYY HH:mm:ss')
      });
      this.properties.push({name: 'Numéro dossier', value: properties['recrut:dossier']});
      this.properties.push({name: 'Domaine d\'activité', value: properties['recrut:DomaineActivite']});
      this.properties.push({name: 'Métier', value: properties['recrut:Metier1']});
      this.properties.push({name: 'Métier 2', value: properties['recrut:Metier2']});
      this.properties.push({name: 'Métier 3', value: properties['recrut:Metier3']});
      this.properties.push({name: 'Niveau d\'expertise', value: this.expPipe.transform(properties['recrut:experience1'])});
      this.properties.push({name: 'Niveau d\'expertise 2', value: this.expPipe.transform(properties['recrut:experience2'])});
      this.properties.push({name: 'Niveau d\'expertise 3', value: this.expPipe.transform(properties['recrut:experience3'])});
    });
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.nodeId = params.nodeId;
      this.url = this.contentService.getContentUrl(this.nodeId);
      this.loadProperties(params.nodeId);

    });
    this.route.queryParams.subscribe(params => {
      this.convertDocxToHtml(params.keywords);
    });
  }
}
