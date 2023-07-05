import { PortailComponent } from './../portail/portail.component';
import { ContextService } from 'services/context.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '@alfresco/adf-core';
import { TranslationService } from '@alfresco/adf-core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service';
import { LoginComponent } from './login.component';
import { Subscription, of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { contextServiceStub } from 'services/context.service.stub';

describe(LoginComponent.name, () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(() => {
    const authenticationServiceStub = () => ({
      login: (arg, value, arg4) => (of({
          type: 'string',
          ticket: 'string',
      }))
    });
    const translationServiceStub = () => ({ use: string => ({}) });
    const titleStub = () => ({ setTitle: string => ({}) });
    const formBuilderStub = () => ({ group: object => ({}) });
    const activatedRouteStub = () => ({
      queryParams: { subscribe: f => f({}) }
    });
    const userServiceStub = () => ({ fetchUserData: () => (of({
        id: 'string',
        email: 'string',
        firstName: 'string',
        lastName: 'string',
        matricule: 'string',
    })) });
    const groupServiceStub = () => ({ listGroup: id => (of([])) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      imports: [RouterTestingModule.withRoutes([{
        path: 'espace-ged/portail',
        component: PortailComponent
      }])],
      providers: [
        UntypedFormBuilder,
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: TranslationService, useFactory: translationServiceStub },
        { provide: Title, useFactory: titleStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: GroupService, useFactory: groupServiceStub },
        { provide: ContextService, useFactory: contextServiceStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const translationServiceStub: TranslationService = fixture.debugElement.injector.get(
        TranslationService
      );
      const titleStub: Title = fixture.debugElement.injector.get(Title);
      spyOn(translationServiceStub, 'use').and.callThrough();
      spyOn(titleStub, 'setTitle').and.callThrough();
      component.ngOnInit();
      expect(translationServiceStub.use).toHaveBeenCalledWith('fr');
      expect(titleStub.setTitle).toHaveBeenCalledWith('Espace GED - Connexion');
    });
  });

  describe('login', () => {
    it('error', () => {
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      const loginErrorString = 'error';

      spyOn(authenticationServiceStub, 'login').and.callFake(() => {
        return throwError(loginErrorString);
      });
      spyOn(component, 'dealWithError');

      component.formLogin.patchValue({
       username: '123',
       password: '123'
      })

      component.login();

      expect(authenticationServiceStub.login).toHaveBeenCalled();
      expect(component.dealWithError).toHaveBeenCalledWith(loginErrorString);
    });


    it('success', () => {
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      const groupServiceStub: GroupService = fixture.debugElement.injector.get(
        GroupService
      );

      spyOn(authenticationServiceStub, 'login').and.callThrough();
      spyOn(userServiceStub, 'fetchUserData').and.callThrough();
      spyOn(groupServiceStub, 'listGroup').and.callThrough();
      spyOn(component, 'dealWithError').and.callThrough();
      spyOn(router, 'navigate');

      component.formLogin.patchValue({
        username: '123',
        password: '123'
      });

      component.login();

      expect(authenticationServiceStub.login).toHaveBeenCalled();
      expect(userServiceStub.fetchUserData).toHaveBeenCalled();
      expect(groupServiceStub.listGroup).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/espace-ged/portail']);
    });
  });

  describe('dealWithError', () => {
    it('dealWithError test', () => {
      component.dealWithError('');
      expect(component.error).toBeDefined();
    });
  })

  describe('ngOnDestroy', () => {
    it('ngOnDestroy', () => {
        component.loginSubscription = new Subscription();
        spyOn(component.loginSubscription, 'unsubscribe');

        component.ngOnDestroy();
        expect(component.loginSubscription.unsubscribe).toHaveBeenCalled();
    })
  });

  describe('getError method', () => {
    it('login error', () => {
        const errorMessage = component.getError('user');
        expect(errorMessage).toBe('Veuillez saisir votre nom d\'utilisateur')
    });

    it('pass error', () => {
        const errorMessage = component.getError('pass');
        expect(errorMessage).toBe('Veuillez saisir votre mot de passe');
    });

    it('default error', () => {
        const errorMessage = component.getError('');
        expect(errorMessage).toBe('');
    });
  })
 });
