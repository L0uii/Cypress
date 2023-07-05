import {Injectable} from '@angular/core';
import {AlfrescoApiService} from '@alfresco/adf-core';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupervisionService {
  fidushare: string = environment.fidushareAPI + environment.fidushareUser;
  user: { id: string, pw: string } = {
    id: environment.alfrescoUser,
    pw: environment.alfrescoPassword
  };

  constructor(private api: AlfrescoApiService) {
  }

  async testGFA(): Promise<any> {
    const gfaStatus = {};
    await this.api
      .getInstance()
      .login(this.user.id, this.user.pw)
      .then((response: any) => {
        if (response.includes('TICKET_')) {
          gfaStatus['ok'] = true;
          gfaStatus['status'] = 200;
        }
      })
      .catch(error => {
        const errorObj = JSON.parse(error.toString().substring(7, error.length));
        const errorArray = errorObj['error'];
        gfaStatus['statusText'] = errorArray.errorKey;
        gfaStatus['status'] = errorArray.statusCode;
        gfaStatus['ok'] = false;
      });
    return gfaStatus;
  }

  async testFiduShare(): Promise<any> {
    let fiduShareStatus = {};
    await fetch(this.fidushare, {
      method: 'GET'
    }).then((response: any) => {
      fiduShareStatus = response;
    });
    return fiduShareStatus;
  }

  async testAll(): Promise<boolean> {
    let gfaStatus: boolean;
    let fiduShareStatus: boolean;

    await this.api
      .getInstance()
      .login(this.user.id, this.user.pw)
      .then((response: any) => {
        if (response.includes('TICKET_')) {
          gfaStatus = true;
        }
      })
      .catch(error => {
        gfaStatus = false;
      });
    await fetch(this.fidushare, {
      method: 'GET'
    }).then((response: any) => (fiduShareStatus = response.ok));
    return !!(gfaStatus && fiduShareStatus);
  }
}
