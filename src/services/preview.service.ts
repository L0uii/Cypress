import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SnackbarService} from './snackbar.service';

@Injectable()
export class PreviewService {
  public content: Blob = null;
  public name: string = null;

  constructor(private router: Router, private snack: SnackbarService) {
  }

  showResource(resourceId: string): void {
    this.router.navigate([{outlets: {view: ['files', resourceId]}}]);
  }

  openInNewTab(id: string): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/preview', id])
    );
    window.open(url, '_blank');
  }

  showPdfs(uuids: string[]) {
    this.router.navigate([{outlets: {view: ['pdfs', uuids]}}]);
  }

  showDocument(element: any, keywords: string[]): void {
    const regex = /\.[0-9a-z]{1,5}$/i;
    const fileType = element.name.match(regex);

    switch (fileType[0]) {
      case '.pdf':
        if (keywords.length > 0) {
          this.router.navigate([{outlets: {view: ['pdf', element.id]}}], {queryParams: {keywords: keywords.join(' ')}});
        } else {
          this.router.navigate([{outlets: {view: ['pdf', element.id]}}]);
        }
        break;

      case '.docx':
        if (keywords.length > 0) {
          this.router.navigate([{outlets: {view: ['docx', element.id]}}], {queryParams: {keywords: keywords.join(' ')}});
        } else {
          this.router.navigate([{outlets: {view: ['docx', element.id]}}]);
        }
        break;

      default:
        this.snack.openWarn('Ce document ne peut pas être affiché dans votre navigateur. Vous pouvez cependant le télécharger.');
        break;
    }
  }
}
