import { NodesApiService, ContentService } from '@alfresco/adf-core';
import {Component, OnInit, ViewChild, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PDFDocumentProxy, PdfViewerComponent} from 'ng2-pdf-viewer';
import * as moment from 'moment';
import {ExpLevelPipe} from 'pipes/exp-level.pipe';

@Component({
  selector: 'app-viewer-pdf',
  templateUrl: './viewer-pdf.component.html',
  styleUrls: ['./viewer-pdf.component.scss'],
  providers: [ExpLevelPipe]
})
export class ViewerPdfComponent implements OnInit {
  nodeId: string;
  url: string;
  pdfSrc: string;
  pdf: any;
  page = 1;
  rotation = 0;
  zoom = 1;
  isLoading = true;
  sideNavOpen = false;
  properties = [];
  keywords: string;
  @ViewChild(PdfViewerComponent, { static: true }) private pdfComponent: PdfViewerComponent;

  constructor(private route: ActivatedRoute,
              private nodesApi: NodesApiService,
              private router: Router,
              private expPipe: ExpLevelPipe,
              private contentService: ContentService) {
    (window as any).pdfWorkerSrc = '/assets/pdfjs/pdf.worker.min.js';
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.incrementPage(1);
    }

    if (event.key === 'ArrowLeft') {
      this.incrementPage(-1);
    }
  }

  incrementPage(amount: number) {
    this.page += amount;
  }

  zoomIn() {
    this.zoom = this.zoom + 0.25;
  }

  zoomOut() {
    if (this.zoom > 0.5) {
      this.zoom = this.zoom - 0.25;
    }
  }

  rotate(angle: number) {
    this.rotation += angle;
  }

  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
  }

  textLayerRendered(e: CustomEvent) {
    if (this.keywords !== undefined) {
      this.search(this.keywords);
    }
    this.isLoading = false;
  }

  toggleNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  updateCV() {
    this.router.navigate([{outlets: {view: ['update-cv', this.nodeId]}}]);
  }

  loadProperties(id) {
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

  close() {
    this.router.navigate([{outlets: {view: null}}]);
  }

  search(stringToSearch: string) {
    if (this.pdfComponent) {
      this.pdfComponent.pdfFindController.executeCommand('find', {
        caseSensitive: false,
        findPrevious: undefined,
        highlightAll: true,
        phraseSearch: false,
        query: stringToSearch
      });
    }
  }

  async download() {
    await fetch(this.url)
      .then(function (response) {
        return response.blob();
      })
      .then(function (pdf) {
        const objectURL = window.URL.createObjectURL(pdf);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = objectURL;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nodeId = params.nodeId;
      this.url = this.contentService.getContentUrl(this.nodeId);
      this.loadProperties(params.nodeId);

    });
    this.route.queryParams.subscribe(params => {
      this.keywords = params.keywords;
    });
  }
}
