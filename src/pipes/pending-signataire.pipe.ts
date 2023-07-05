import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pendingSignataire'
})
export class PendingSignatairePipe implements PipeTransform {

  transform(element): string {
    let result = '';
    const pendingSignataire = [];
    const signataires = [
      element.PrenomSignataire1 ? `${element.PrenomSignataire1} ${element.NomSignataire1}` : undefined,
      element.PrenomSignataire2 ? `${element.PrenomSignataire2} ${element.NomSignataire2}` : undefined,
      element.PrenomSignataire3 ? `${element.PrenomSignataire3} ${element.NomSignataire3}` : undefined,
      element.PrenomSignataire4 ? `${element.PrenomSignataire4} ${element.NomSignataire4}` : undefined
    ];
    if (element.StatutSignature.includes('SIGNATURE_EC_')) {
      const alreadySigned = element.StatutSignature.replace('SIGNATURE_EC_', '').split('');
      for (let i = 0; i < 4; i++) {
        if (!alreadySigned.includes(`${i + 1}`) && signataires[i]) {
          pendingSignataire.push( signataires[i]);
        }
      }
      result = pendingSignataire.join(', ');
    } else if (element.StatutSignature === 'DOCUMENT_SIGNE') {
      result = 'Document signé.';
    } else {
      for (let i = 0; i < 4; i++) {
        if (signataires[i]) {
          pendingSignataire.push(signataires[i]);
        }
      }
      result = pendingSignataire.join(', ');
    }
    return result;
  }
}
