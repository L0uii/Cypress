import { endpoints } from './../endpoints/endpoints';
import { UtilsService } from './utils.service';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService, PeopleContentService } from '@alfresco/adf-core';
import {Injectable} from '@angular/core';
import {User} from 'models/user';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Observable} from 'rxjs/internal/Observable';
import {IntranetUser} from '../models/intranet-user';
import { PersonBodyUpdate } from '@alfresco/js-api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: BehaviorSubject<User> = new BehaviorSubject(null);
  private _selectedCodeBudget: BehaviorSubject<string> = new BehaviorSubject('');
  private _userCodeBudgets: BehaviorSubject<Array<string>> = new BehaviorSubject([]);

  private readonly userKey = 'GED.User';
  private readonly codeBudgetKey = 'GED.CodeBudget';
  private readonly codeBudgetListKey = 'GED.CodeBudgetList';

  get currentUser(): User {
    if (!this._user.getValue()) {
      this._user.next(JSON.parse(localStorage.getItem(this.userKey)));
    }

    return this._user.getValue();
  }

  get selectedCodeBudget(): string {
    if (!this._selectedCodeBudget.getValue()) {
      this._selectedCodeBudget.next(localStorage.getItem(this.codeBudgetKey) ?? '');
    }

    return this._selectedCodeBudget.getValue();
  }

  get selectedCodeBudgetRef(): Observable<string> {
    return this._selectedCodeBudget.asObservable();
  }

  get codeBudgets(): string[] {
    if (this._userCodeBudgets.getValue().length === 0) {
      this._userCodeBudgets.next(JSON.parse(localStorage.getItem(this.codeBudgetListKey)) ?? []);
    }

    return this._userCodeBudgets.getValue();
  }

  constructor(
    private auth: AuthenticationService,
    private utils: UtilsService,
    private peopleApi: PeopleContentService
  ) {
  }

  fetchUserData(): Observable<User> {
    return this.peopleApi.getPerson(this.auth.getEcmUsername())
      .pipe(
        map((entry) => {
          const { id, email, firstName, lastName, properties } = entry;

          let matricule = '', codeBudget = '', codeBudgetPlus = [], lastConnectionVersion = '';
          if (properties) {
            matricule = properties['ldap:employeeNumber'] ?? '';

            codeBudget = properties['ldap:departmentNumber'] ?? '';
            codeBudgetPlus = properties['ldap:codeBudgetPlus']?.split(',') ?? [];
            codeBudgetPlus = !!codeBudget ? [codeBudget, ...codeBudgetPlus] : codeBudgetPlus;

            lastConnectionVersion = properties['ldap:egdVersion'] ?? '';
          }
          this.setCodeBudget(codeBudget);
          this.setUserCodeBudget(codeBudgetPlus);

          const user: User = {
            id,
            email,
            firstName,
            lastName,
            matricule,
            lastConnectionVersion
          };
          this.setUser(user);
          return user;
        })
      );
  }

  updateUserData(body: PersonBodyUpdate) {
    return this.peopleApi.updatePerson(this.auth.getEcmUsername(), body);
  }

  private setUserCodeBudget(codeBudgets: string[]) {
    this._userCodeBudgets.next(codeBudgets);
    localStorage.setItem(this.codeBudgetListKey, JSON.stringify(codeBudgets));
  }

  private setUser(user: User) {
    this._user.next(user);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private clearUser() {
    this._user.next(null);
    localStorage.removeItem(this.userKey);
  }

  setCodeBudget(codeBudget: string) {
    this._selectedCodeBudget.next(codeBudget);
    localStorage.setItem(this.codeBudgetKey, codeBudget);
  }

  private clearCodeBudget() {
    this._selectedCodeBudget.next('');
    this._userCodeBudgets.next([]);

    localStorage.removeItem(this.codeBudgetKey);
    localStorage.removeItem(this.codeBudgetListKey);
  }

  editCodeBudgetPlus(user: IntranetUser) {
    return fetch(endpoints.frontGEDEditCodeBudgetPlus, {
      method: 'PUT',
      headers: new Headers({
        'user': user.UserName,
        'codeBudgetPlus': user.CodeBudgetPlus,
        'ticket': this.utils.getHeaderTicket(),
        'Accept': 'application/json'
      })
    });
  }

  setUserAppVersion(lastConnectionVersion: string) {
    this._user.next({...this.currentUser, lastConnectionVersion});
    this.setUser(this.currentUser);
  }


  clearContext() {
    this.clearCodeBudget();
    this.clearUser();
  }
}
