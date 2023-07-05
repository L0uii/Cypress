import { ContextService } from 'services/context.service';
import { AuthenticationService, AlfrescoApiService } from '@alfresco/adf-core';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GroupService} from '../services/group.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private groupService: GroupService,
    private alfrescoApiService: AlfrescoApiService,
    private contextService: ContextService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkIsLogged(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url.includes('gerance-associes') && this.groupService.onlyGeranceAssocPart()) {
      this.router.navigate(['/gerance-associes']);
    }
    return this.checkIsLogged(state.url);
  }

  private checkIsLogged(returnUrl: string): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.authenticationService.isLoggedIn() &&
      this.alfrescoApiService.getInstance().isLoggedIn() &&
      this.contextService.isTokenValid
    ) {
      return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl}});
    return false;
  }
}
