import { endpoints } from './../endpoints/endpoints';
import {UserService} from 'services/user.service';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '@alfresco/adf-core';
import {environment} from 'environments/environment';
import {UtilsService} from './utils.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GroupUser} from '../models/group-user';
import {map, reduce} from 'rxjs/operators';
import {ESPACES_GED} from '../consts/espaces-ged';
import {GroupsEnums} from 'enums/groups.enums';
import { BehaviorSubject, Observable, of, forkJoin } from 'rxjs';
import {ConseilUser, ConseilUserResponse} from '../models/conseil';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  isOnlyOneGEDSpace: boolean;
  basicAuth: string = btoa(environment.alfrescoUser + ':' + environment.alfrescoPassword);

  private _rights: BehaviorSubject<GroupsEnums[]> = new BehaviorSubject(null);

  private readonly rightsKey = 'rights';

  constructor(
    private auth: AuthenticationService,
    private utils: UtilsService,
    private http: HttpClient,
    private userService: UserService
  ) {
  }

  searchUsersConseil(): Observable<ConseilUser[]> {
    return forkJoin([
      this.http.get<ConseilUserResponse>(environment.alfrescoGroupConseilBO),
      this.http.get<ConseilUserResponse>(environment.alfrescoGroupConseilCGP)
    ]).pipe(
      map(([resBo, resCgp]) => {
        const conseilBoList = resBo.data;
        const allUserList = resCgp.data;

        return this.utils.removeDuplicates(conseilBoList.concat(allUserList), 'shortName')
      })
    );
  }

  get rights(): GroupsEnums[] {
    if (!this._rights.getValue()) {
      this._rights.next(JSON.parse(localStorage.getItem(this.rightsKey)));
    }

    return this._rights.getValue() ?? [];
  }

  getEspacesGED() {
    return ESPACES_GED.filter((item) =>
      this.rights
        .filter((r) => r !== GroupsEnums.isUserGeranceAssociesPartenaire)
        .some((group) => group.includes(item.name) || group.includes(item.altname))
    );
  }

  checkGEDSpaceNumber() {
    this.isOnlyOneGEDSpace = this.getEspacesGED().length === 1;
  }

  listGroup(user: string): Observable<GroupsEnums[]> {
    if (this.userService.codeBudgets.length == 0) {
      this.setRights([]);
      return of([]);
    }

    let headers = new HttpHeaders();
    headers = headers.set('user', `${user}`)
      .set('ticket', `${this.auth.getEcmUsername()}` + '$' + `${this.auth.getTicketEcm()}`)
      .set('Accept', 'application/json');
    return this.http.get<GroupsEnums[]>(endpoints.getGroupUser, {
      headers
    }).pipe(reduce((acc, val) => Object.assign(acc, val), {} as GroupUser),
      map(groupUser => {
        const userGroupArray = groupUser?.list?.entries?.map(right => right.entry.id as GroupsEnums) ?? [];
        const geranceImmo = userGroupArray.indexOf(userGroupArray.filter(userGrp => userGrp.includes('GERANCE'))
          .find(grp => grp.length === 17));
        if (geranceImmo !== -1) {
          userGroupArray[geranceImmo] = GroupsEnums.isUserGeranceImmobilier;
        }
        this.setRights(userGroupArray);
        return userGroupArray;
      }));
  }

  private setRights(userGroupArray: GroupsEnums[]) {
    localStorage.setItem(this.rightsKey, JSON.stringify(userGroupArray));
    this._rights.next(userGroupArray);
  }

  onlyGeranceAssocPart() {
    if (this.rights.includes(GroupsEnums.isUserGeranceAssociesPartenaire) &&
      !this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesBO) &&
      !this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesSUPP) &&
      !this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesCONSULT) &&
      !this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesCONSULT_RECL) &&
      !this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesRECL) &&
      !this.rights.includes(GroupsEnums.isUserGeranceAssociesPartenaireBO) &&
      !this.rights.includes(GroupsEnums.isUserGeranceAssociesPartenaireSUPP)) {
      return true;
    }
  }

  /** Checks if user belong to any of the groups.
   * @param groupNames List of groups
   * @param checkAll Checks if user belongs to all groups in the list
  */
  isInGroups(groupNames: GroupsEnums[], checkAll: boolean = false): boolean {
    if (groupNames?.length > 0) {
      return checkAll ?
        groupNames.every((g) => this.rights.includes(g)) :
        groupNames.some((g) => this.rights.includes(g));
    }
    return false;
  }

  clearContext() {
    localStorage.removeItem(this.rightsKey)
    this._rights.next(null);
  }
}
