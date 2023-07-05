import {GeranceAssociesService} from 'services/gerance-associes.service';
import {GroupService} from 'services/group.service';
import {UserService} from 'services/user.service';
import {Injectable} from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  private readonly _currentVersionKey = 'EGD.CurrentVersion';
  private _newVersionSnackBarShown = false;

  readonly currentVersion = '1.17.4.1';

  private readonly _tokenExpirationKey = 'EGD.TokenExpiration';

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private geranceAssociesService: GeranceAssociesService,
  ) { }

  clear() {
    this.userService.clearContext();
    this.groupService.clearContext();
    this.geranceAssociesService.clearContext();
    this.clearLocalStorage();
  }

  saveCurrentVersion(): void {
    this._newVersionSnackBarShown = true;
    this.saveVersion(this.currentVersion);
  }

  saveTokenExpiration(): void {
    localStorage.setItem(this._tokenExpirationKey, moment().add(12, 'hours').toISOString());
  }

  get isTokenValid(): boolean {
    const tokenExpiration = localStorage.getItem(this._tokenExpirationKey);
    return !!tokenExpiration && tokenExpiration > new Date().toISOString();
  }

  get isNewVersion(): boolean {
    return this.cachedVersion !== this.currentVersion;
  }

  get wasVersionSnackBarShown(): boolean {
    return this._newVersionSnackBarShown;
  }

  private saveVersion(version: string) {
    const payload = {
      properties: { 'ldap:egdVersion': version }
    }
    this.userService.updateUserData(payload).subscribe( () => this.userService.setUserAppVersion(version));
  }

  private get cachedVersion() {
    return this.userService.currentUser.lastConnectionVersion;
  }

  private clearLocalStorage() {
    document.cookie = 'ALFRESCO_REMEMBER_ME= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.clear();
  }
}
