import { NodesApiService, ContentService } from '@alfresco/adf-core';
import {Component, EventEmitter, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PDFDocumentProxy, PdfViewerComponent} from 'ng2-pdf-viewer';
import * as moment from 'moment';
import paginate from 'jw-paginate';
import {SigningStatusPipe} from 'pipes/signing-status.pipe';

@Component({
  selector: 'app-viewer-multi-pdf',
  templateUrl: './viewer-multi-pdf.component.html',
  styleUrls: ['./viewer-multi-pdf.component.scss']
})
export class ViewerMultiPdfComponent implements OnInit, OnChanges {
  items: Array<any>;
  changePage = new EventEmitter<any>(true);
  initialPage = 1;
  pageSize = 1;
  maxPages = 10;
  pager: any = {};
  uuids: string[];
  documents = [];
  pdfSrc: string;
  pdf: any;
  page = 1;
  rotation = 0;
  zoom = 1;
  sideNavOpen = false;
  properties = [];

  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
  pageOfItems: any[];

  constructor(private route: ActivatedRoute,
              private nodesApi: NodesApiService,
              private router: Router,
              private contentService: ContentService) {
    (window as any).pdfWorkerSrc = '/assets/pdfjs/pdf.worker.min.js';
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

  afterLoadComplete(pdf: PDFDocumentProxy, id) {
    this.pdf = pdf;
    this.loadProperties(id);
  }

  toggleNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  loadProperties(id) {
    const statusPipe = new SigningStatusPipe;
    this.nodesApi.getNode(id).toPromise().then(resp => {
      const properties = resp.properties;
      const signingStatus = {
        'StatutSignature': properties['fiduSign:statut'],
        'PrenomSignataire1': properties['fiduSign:prenomSignataire1'],
        'NomSignataire1': properties['fiduSign:nomSignataire1'],
        'PrenomSignataire2': properties['fiduSign:prenomSignataire2'],
        'NomSignataire2': properties['fiduSign:nomSignataire2'],
        'PrenomSignataire3': properties['fiduSign:prenomSignataire3'],
        'NomSignataire3': properties['fiduSign:nomSignataire3']
      };
      this.properties.push({name: 'Nom du document', value: resp.name});
      this.properties.push({
        name: 'Date demande',
        value: moment(properties['fiduSign:dateDemande']).format('DD/MM/YYYY HH:mm:ss')
      });
      this.properties.push({name: 'Statut de signature', value: statusPipe.transform(signingStatus)});
      this.properties.push({
        name: 'Emetteur', value: `${properties['fiduSign:prenomEmetteur']} ${properties['fiduSign:nomEmetteur']}`
      });
      this.properties.push({
        name: 'Signataire 1', value: `${properties['fiduSign:prenomSignataire1']} ${properties['fiduSign:nomSignataire1']}`
      });
      this.properties.push({
        name: 'E-mail signataire 1', value: `${properties['fiduSign:mailSignataire1']}`
      });
      if (properties['fiduSign:mailSignataire2']) {
        this.properties.push({
          name: 'Signataire 2', value: `${properties['fiduSign:prenomSignataire2']} ${properties['fiduSign:nomSignataire2']}`
        });
        this.properties.push({
          name: 'E-mail signataire 2', value: `${properties['fiduSign:mailSignataire2']}`
        });
      }
      if (properties['fiduSign:mailSignataire3']) {
        this.properties.push({
          name: 'Signataire 3', value: `${properties['fiduSign:prenomSignataire3']} ${properties['fiduSign:nomSignataire3']}`
        });
        this.properties.push({
          name: 'E-mail signataire 3', value: `${properties['fiduSign:mailSignataire3']}`
        });
      }
      if (properties['fiduSign:mailSignataire4']) {
        this.properties.push({
          name: 'Signataire 4', value: `${properties['fiduSign:prenomSignataire4']} ${properties['fiduSign:nomSignataire4']}`
        });
        this.properties.push({
          name: 'E-mail signataire 4', value: `${properties['fiduSign:mailSignataire4']}`
        });
      }

      /* Métadonnées spécifiques Fidusign Achats */
      if (this.router.url.includes('achats')) {
        this.properties.push({
          name: 'Client interne', value: properties['contrat:clientinterne']
        });
        this.properties.push({
          name: 'Date de prise d\'effet',
          value: properties['contrat:dateContrat'] ? moment(properties['contrat:dateContrat']).format('DD/MM/YYYY') : 'Non renseignée'
        });
        this.properties.push({
          name: 'Date fin de contrat',
          value: properties['contrat:dateFinContrat'] ? moment(properties['contrat:dateFinContrat']).format('DD/MM/YYYY') : 'Non renseignée'
        });
        if (properties['contrat:resiliation']) {
          this.properties.push({
            name: 'Date de résiliation',
            value: moment(properties['contrat:resiliation']).format('DD/MM/YYYY')
          });
        }
        this.properties.push({name: 'Reconduction', value: properties['contrat:reconduction']});
        this.properties.push({name: 'Fournisseur', value: properties['contrat:fournisseur']});
        this.properties.push({name: 'Nature du document', value: properties['contrat:nature']});
        this.properties.push({name: 'Catégorie du contrat', value: properties['fiducial:domainContainerFamille']});
        this.properties.push({name: 'Sous catégorie du contrat', value: properties['fiducial:domainContainerSousFamille']});
      }
      /* Métadonnées spécifiques Fidusign Gérance */
      if (this.router.url.includes('gerance')) {
        this.properties.push({name: 'Type bail', value: `${properties['gerance:bailType']}`});
        this.properties.push({name: 'Code bail', value: `${properties['gerance:bailCode']}`});
        this.properties.push({
          name: 'Date bail',
          value: properties['gerance:bailDate'] ? moment(properties['gerance:bailDate']).format('DD/MM/YYYY') : 'Non renseignée'
        });
        this.properties.push({name: 'Code immeuble', value: `${properties['gerance:immeubleCode']}`});
        this.properties.push({name: 'Nom immeuble', value: `${properties['gerance:immeubleNom']}`});
        this.properties.push({name: 'Adresse immeuble', value: `${properties['gerance:immeubleAdresse']}`});
        this.properties.push({name: 'Propriétaire immeuble', value: `${properties['gerance:immeubleProprietaire']}`});
        this.properties.push({name: 'Code lot', value: `${properties['gerance:lotCode']}`});
        this.properties.push({name: 'Code locataire', value: `${properties['gerance:locataireCode']}`});
        this.properties.push({name: 'Nom locataire', value: `${properties['gerance:locataireNom']}`});
      }
    });
  }

  close() {
    this.router.navigate([{outlets: {view: null}}]);
  }

  async download(doc) {
    this.nodesApi.getNode(doc.id).toPromise().then(async resp => {
      await fetch(doc.url)
        .then(function (response) {
          return response.blob();
        })
        .then(function (pdf) {
          const objectURL = window.URL.createObjectURL(pdf);
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = objectURL;
          link.setAttribute('download', resp.name);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    if (changes.urls.currentValue !== changes.urls.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  setPage(page: number) {
    this.pdf = undefined;
    this.page = 1;
    this.rotation = 0;
    this.zoom = 1;
    this.properties = [];
    // get new pager object for specified page
    this.pager = paginate(this.documents.length, page, this.pageSize, this.maxPages);

    // get new page of items from items array
    this.pageOfItems = this.documents.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uuids = params.nodeId.split(',');

      this.uuids.forEach(id => {
        this.documents.push({
          url: this.contentService.getContentUrl(id),
          id: id
        });
      });

      if (this.documents && this.documents.length) {
        this.setPage(this.initialPage);
      }
    });
  }
}
