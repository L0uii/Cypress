import { UserService } from 'services/user.service';
import { ContextService } from 'services/context.service';
import { AuthenticationService } from '@alfresco/adf-core';
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private contextService: ContextService,
    private userService: UserService
    ) { }

  canActivate(next: ActivatedRouteSnapshot) {
    return this.checkAuth();
  }

  canActivateChild(next: ActivatedRouteSnapshot) {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (
      this.auth.isLoggedIn() &&
      !!this.userService.currentUser &&
      this.contextService.isTokenValid
    ) {
      this.router.navigate(['/espace-ged/portail']);
      return false;
    }

    this.contextService.clear();
    return true;
  }
}
