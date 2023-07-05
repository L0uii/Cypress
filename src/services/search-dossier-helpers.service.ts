import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface MinifiedResponse {
  u?: string,
  o?: string,
  s?: string
}

@Injectable({
  providedIn: 'root'
})
export class SearchDossierHelpersService {

  statutsAffaire = {
    A: 'ACT - Active',
    R: 'RES - Résiliée',
    I: 'INA - Inactive',
    P: 'PER - Perdue'
  };

  checkStatus400(res: any): void {
    if (res?.code === 400)
      throw new HttpErrorResponse({ error: { message: '400 Error' }, status: 400 });
  }
}

