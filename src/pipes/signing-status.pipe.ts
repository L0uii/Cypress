import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'signingStatus'})
export class SigningStatusPipe implements PipeTransform {
  transform(element): string {
    if (element.StatutSignature.includes('SIGNATURE_EC')) {
      const signataires = [];
      for (let i = 1; i <= 4; i++) {
        if (element.StatutSignature.includes(i)) {
          signataires.push(`${element['PrenomSignataire' + i]} ${element['NomSignataire' + i]}`);
        }
      }
      return `Document signé par : ${signataires.join(', ')}`;
    } else {
      switch (element.StatutSignature) {
        case 'DOCUMENT_CERTIFIE':
          return 'Erreur lors de l\'envoi par e-mail';
        case 'MAIL_ENVOYE':
          return 'Mail envoyé';
        case 'MAIL_SEND':
          return 'Mail envoyé';
        case 'MAIL_PROCESSED':
          return 'Adresse e-mail modifiée';
        case 'MAIL_RENVOYE':
          return 'Mail renvoyé';
        case 'DEMANDE_ANNULEE':
          return 'Demande annulée';
        case 'DOCUMENT_LU':
          return 'Document lu';
        case 'DOCUMENT_SIGNE':
          return 'Document signé';
        case 'DEMANDE_EXPIREE':
          return 'Demande expirée';
        case 'DEMANDE_ENVOYEE':
          return 'Demande envoyée';
        default:
          return '';
      }
    }

  }
}
