import { ContextService } from 'services/context.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService, TranslationService} from '@alfresco/adf-core';
import {Title} from '@angular/platform-browser';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import { finalize, switchMap, tap } from 'rxjs/operators';
import {forkJoin, of, Subscription} from 'rxjs';
import {GroupService} from '../../services/group.service';
import {SearchDossierExpertiseService} from 'services/search-dossier-expertise.service';
import {GroupsEnums} from '../../enums/groups.enums';
import * as Sentry from "@sentry/angular-ivy";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  error: string;
  returnUrl: string;
  showPassword = false;
  formLogin: UntypedFormGroup;
  year: number;
  disabled: boolean;
  loginSubscription: Subscription;

  constructor(
    private translateService: TranslationService,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private authentificationService: AuthenticationService,
    private formBuilder: UntypedFormBuilder,
    private groupService: GroupService,
    private userService: UserService,
    private contextService: ContextService
  ) {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.title.setTitle('Espace GED - Connexion');
    this.year = new Date().getFullYear();
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params.returnUrl || undefined;
    });
    this.translateService.use('fr');
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  login() {
    this.disabled = true;
    const { username, password } = this.formLogin.value;
    this.loginSubscription = this.authentificationService
      .login(username.toLowerCase(), password, true)
      .pipe(
        switchMap(() => this.userService.fetchUserData()),
        switchMap((user) => this.groupService.listGroup(user.id)),
        finalize(() => this.disabled = false)
      )
      .subscribe({
        next: () => {
          this.enterAuthArea();
          Sentry.captureMessage(`login successfull for user: ${username}`, 'log');
        },
        error: (err) => {
          this.dealWithError(err);
        }
      });
  }

  dealWithError(error) {
    if (this.authentificationService.isLoggedIn) {
      this.authentificationService.logout();
    }

    this.error = error?.status?.toString().startsWith('4') ?
      'Le nom d\'utilisateur ou le mot de passe entré est inconnu' :
      'Problème de connexion au serveur';
  }


  private enterAuthArea() {
    this.contextService.saveTokenExpiration();
    this.router.navigate([this.returnUrl ? this.returnUrl : '/espace-ged/portail']);
  }

  getError(el) {
    switch (el) {
      case 'user':
        if (this.formLogin.get('username').hasError('required')) {
          return 'Veuillez saisir votre nom d\'utilisateur';
        }
        break;
      case 'pass':
        if (this.formLogin.get('password').hasError('required')) {
          return 'Veuillez saisir votre mot de passe';
        }
        break;
      default:
        return '';
    }
  }
}
